import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FilteredMovies() {
    const location = useLocation();
    const navigate = useNavigate();
    const { yearOfRelease, category, rating } = location.state || {};

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let queryParams = [];
        if (yearOfRelease) queryParams.push(`yearOfRelease=${yearOfRelease}`);
        if (category) queryParams.push(`category=${category}`);
        if (rating) queryParams.push(`rating=${rating}`);
        const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

        fetch(`http://localhost:8080/movies${queryString}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return response.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [yearOfRelease, category, rating]);

    return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', minHeight: '100vh' }}>
            <button 
                onClick={() => navigate('/movies')} 
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid white',
                    backgroundColor: 'transparent',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                ←
            </button>

            <h1 style={{ textAlign: 'center', flex: 1 }}>Filtered Movies</h1>

            {loading && <p>Loading movies...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginTop: '20px' }}>
                {movies.length === 0 && !loading ? (
                    <p style={{ textAlign: 'center', color: 'white', fontSize: '18px' }}>No results found</p>
                ) : (
                    movies.map(movie => (
                        <div
                            key={movie.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid white',
                                margin: '10px',
                                padding: '10px',
                                borderRadius: '10px',
                            }}
                        >
                            <img
                                src={`http://localhost:8080/movies/images/${movie.imageFilename}`}
                                alt={movie.movieName}
                                style={{ width: '150px', height: '220px', borderRadius: '5px', marginRight: '20px' }}
                            />
                            <div>
                                <h2>{movie.movieName}</h2>
                                <p>Year of Release: {movie.yearOfRelease}</p>
                                <p>Category: {movie.category}</p>
                                <p style={{ color: 'gold', fontSize: '24px' }}>{'★'.repeat(movie.rating)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FilteredMovies;
