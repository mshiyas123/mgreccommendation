package com.bnworld.repositories;

import com.bnworld.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m " +
            "WHERE (:yearOfRelease IS NULL OR m.yearOfRelease = :yearOfRelease) " +
            "AND (:category IS NULL OR LOWER(m.category) = LOWER(:category)) " +
            "AND (:rating IS NULL OR m.rating = :rating)")
    List<Movie> findByFilters(@Param("yearOfRelease") Integer yearOfRelease,
                              @Param("category") String category,
                              @Param("rating") Integer rating);
}
