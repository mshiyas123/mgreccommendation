package com.bnworld.controllers;

import com.bnworld.entities.Movie;
import com.bnworld.repositories.MovieRepository;
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
@RequestMapping("/movies")
public class MovieController {
    private final MovieRepository movieRepository;

    // Directory to save uploaded images
    private static final String IMAGE_UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/images/movies/";

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // Get all movies or filter movies based on query params
    @GetMapping
    public ResponseEntity<List<Movie>> getMovies(
            @RequestParam(required = false) Integer yearOfRelease,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer rating) {

        List<Movie> movies;

        if (yearOfRelease == null && category == null && rating == null) {
            movies = movieRepository.findAll(); // Return all movies if no filters are provided
        } else {
            movies = movieRepository.findByFilters(yearOfRelease, category, rating);
        }

        return ResponseEntity.ok(movies);
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

    // Add a new movie
    @PostMapping
    public ResponseEntity<String> addMovie(
            @RequestParam String movieName,
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

            Movie movie = new Movie();
            movie.setMovieName(movieName);
            movie.setYearOfRelease(yearOfRelease);
            movie.setCategory(category);
            movie.setRating(rating);
            movie.setImageFilename(imageFilename);

            movieRepository.save(movie);
            return ResponseEntity.ok("Movie saved successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving movie image: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving movie: " + e.getMessage());
        }
    }
}