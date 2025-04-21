package com.bnworld.controllers;

import com.bnworld.entities.Favourite;
import com.bnworld.repositories.FavouriteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/favourites")
public class FavouriteController {
    private final FavouriteRepository favouriteRepository;

    public FavouriteController(FavouriteRepository favouriteRepository) {
        this.favouriteRepository = favouriteRepository;
    }

    @PostMapping(value = "/addFavoriteMovie")
    public ResponseEntity<String> favMovie(
            @RequestParam Long movieId) {
        try {

            Favourite fav = new Favourite();
            fav.setMovieId(movieId);

            favouriteRepository.save(fav);
            return ResponseEntity.ok("Favourite movies added successfully!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping(value = "/addFavoriteGame")
    public ResponseEntity<String> favGame(
            @RequestParam Long gameId) {
        try {

            Favourite fav = new Favourite();
            fav.setMovieId(gameId);

            favouriteRepository.save(fav);
            return ResponseEntity.ok("Favourite games added successfully!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
