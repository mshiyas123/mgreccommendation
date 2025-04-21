// src/services/favoriteService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/favourites';

export const addFavoriteMovie = (movieId) => {
  return axios.post(`${API_BASE}/addFavoriteMovie`, null, {
    params: { movieId }
  });
};

export const addFavoriteGame = (gameId) => {
  return axios.post(`${API_BASE}/addFavoriteGame`, null, {
    params: { gameId }
  });
};
