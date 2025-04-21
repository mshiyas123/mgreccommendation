import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFavoriteMovie } from '../services/favoriteService'; // 🆕 Import

function Movies() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/movies')
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.movieName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleFilterMovies = () => {
        navigate('/filter-movies');
    };

    const handleAddMovie = () => {
        navigate('/add-movie');
    };

    const goBack = () => {
        navigate('/');
    };

    const handleAddToFavorites = async (id) => {
        try {
            await addFavoriteMovie(id);
            alert("Movie added to favorites!");
        } catch (err) {
            console.error(err);
            alert("Failed to add favorite.");
        }
    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: 'black',
                    paddingBottom: '20px',
                    borderBottom: '1px solid white',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <button
                        onClick={goBack}
                        style={{
                            padding: '5px',
                            borderRadius: '10%',
                            border: '1px solid white',
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '20px',
                            cursor: 'pointer',
                            marginRight: '20px',
                        }}
                    >
                        ←
                    </button>
                    <h1 style={{ textAlign: 'center', flex: 1 }}>Recommended Movies</h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <button
                        onClick={toggleMenu}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: '1px solid white',
                            backgroundColor: 'black',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        &#9776;
                    </button>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <input
                            type="text"
                            placeholder="Search Movies..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{
                                padding: '10px',
                                borderRadius: '15px',
                                border: '1px solid white',
                                backgroundColor: 'black',
                                color: 'white',
                                fontSize: '16px',
                                width: '80%',
                                maxWidth: '500px',
                            }}
                        />
                    </div>
                </div>

                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        style={{
                            position: 'absolute',
                            top: '170px',
                            backgroundColor: 'black',
                            border: '1px solid white',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            zIndex: 2000,
                        }}
                    >
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={{ margin: '15px 0' }}>
                                <button
                                    onClick={handleFilterMovies}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '25px',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'grey'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                                >
                                    Filter Movies
                                </button>
                            </li>
                            <li style={{ margin: '15px 0' }}>
                                <button
                                    onClick={handleAddMovie}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '25px',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'grey'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                                >
                                    Add a Movie
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Movie List with Add to Favorite */}
            <div style={{ marginTop: '20px' }}>
                {filteredMovies.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'white', fontSize: '18px' }}>No results found</p>
                ) : (
                    filteredMovies.map(movie => (
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
                            <div style={{ flex: 1 }}>
                                <h2>{movie.movieName}</h2>
                                <p>Year of Release: {movie.yearOfRelease}</p>
                                <p>Category: {movie.category}</p>
                                <p style={{ color: 'gold', fontSize: '24px' }}>{'★'.repeat(movie.rating)}</p>
                                <button
                                    onClick={() => handleAddToFavorites(movie.id)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '5px 15px',
                                        borderRadius: '5px',
                                        border: '1px solid white',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ❤️ Add to Favorite
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Movies;
