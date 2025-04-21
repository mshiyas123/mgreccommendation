import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFavoriteGame } from '../services/favoriteService'; // 🆕 Import API

function Games() {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/games')
            .then(response => response.json())
            .then(data => setGames(data));
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

    const filteredGames = games.filter(game =>
        game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const handleFilterGames = () => navigate('/filter-games');
    const handleAddGame = () => navigate('/add-game');
    const goBack = () => navigate('/');

    // 🆕 Add to Favorites Handler
    const handleAddToFavorites = async (id) => {
        try {
            await addFavoriteGame(id);
            alert("Game added to favorites!");
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
                    <h1 style={{ textAlign: 'center', flex: 1 }}>Recommended Games</h1>
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
                            placeholder="Search Games..."
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
                            padding: '20px',
                            borderRadius: '5px',
                            zIndex: 2000,
                        }}
                    >
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={{ margin: '15px 0' }}>
                                <button
                                    onClick={handleFilterGames}
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
                                    Filter Games
                                </button>
                            </li>
                            <li style={{ margin: '15px 0' }}>
                                <button
                                    onClick={handleAddGame}
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
                                    Add a Game
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Displaying Games */}
            <div style={{ marginTop: '20px' }}>
                {filteredGames.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'white', fontSize: '18px' }}>No results found</p>
                ) : (
                    filteredGames.map(game => (
                        <div
                            key={game.id}
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
                                src={`http://localhost:8080/games/images/${game.imageFilename}`}
                                alt={game.gameName}
                                style={{ width: '150px', height: '220px', borderRadius: '5px', marginRight: '20px' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h2>{game.gameName}</h2>
                                <p>Year of Release: {game.yearOfRelease}</p>
                                <p>Category: {game.category}</p>
                                <p style={{ color: 'gold', fontSize: '24px' }}>{'★'.repeat(game.rating)}</p>
                                <button
                                    onClick={() => handleAddToFavorites(game.id)}
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
                                    🎮 Add to Favorite
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Games;
