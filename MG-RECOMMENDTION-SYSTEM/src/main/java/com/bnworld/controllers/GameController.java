package com.bnworld.controllers;

import com.bnworld.entities.Game;
import com.bnworld.repositories.GameRepository;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {
    private final GameRepository gameRepository;

    // Directory to save uploaded images
    private static final String IMAGE_UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/images/games/";

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    // Get all games or filter games based on query params
    @GetMapping
    public ResponseEntity<List<Game>> getGames(
            @RequestParam(required = false) Integer yearOfRelease,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer rating) {

        List<Game> games;

        if (yearOfRelease == null && category == null && rating == null) {
            games = gameRepository.findAll(); // Return all games if no filters are provided
        } else {
            games = gameRepository.findByFilters(yearOfRelease, category, rating);
        }

        return ResponseEntity.ok(games);
    }

    // Serve image dynamically
    @GetMapping("/images/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(IMAGE_UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new FileSystemResource(filePath.toFile());
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Add a new game
    @PostMapping
    public ResponseEntity<String> addGame(
            @RequestParam String gameName,
            @RequestParam int yearOfRelease,
            @RequestParam String category,
            @RequestParam int rating,
            @RequestParam(required = false) MultipartFile image) {

        try {
            String imageFilename = null;

            // Save image if provided
            if (image != null && !image.isEmpty()) {
                imageFilename = image.getOriginalFilename();
                File uploadDir = new File(IMAGE_UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }
                File imageFile = new File(IMAGE_UPLOAD_DIR + imageFilename);
                image.transferTo(imageFile);
            }

            Game game = new Game();
            game.setGameName(gameName);
            game.setYearOfRelease(yearOfRelease);
            game.setCategory(category);
            game.setRating(rating);
            game.setImageFilename(imageFilename);

            gameRepository.save(game);

            return ResponseEntity.ok("Game saved successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving game image: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving game: " + e.getMessage());
        }
    }
}