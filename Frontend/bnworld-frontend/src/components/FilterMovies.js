import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FilterMovies() {
    const navigate = useNavigate();
    const [yearOfRelease, setYearOfRelease] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Construct filter object
        const filters = {
            ...(yearOfRelease && { yearOfRelease }),
            ...(category && { category }),
            ...(rating && { rating })
        };

        // Navigate with filter parameters in state
        navigate('/filtered-movies', { state: filters });
    };

    return (
        <div style={{
            backgroundColor: 'black',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 0,
        }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/movies')}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '5px',
                    borderRadius: '10%',
                    border: '1px solid white',
                    backgroundColor: 'transparent',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                }}
            >
                ←
            </button>
            
            <div style={{
                backgroundColor: 'black',
                border: '1px solid white',
                borderRadius: '10px',
                padding: '20px',
                paddingTop: '100px',
                width: '500px',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                position: 'relative',
                textAlign: 'center',
            }}>
                <h1 style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    margin: 0,
                }}>Filter Movies</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Year of Release"
                        value={yearOfRelease}
                        onChange={(e) => setYearOfRelease(e.target.value)}
                        min="1000"
                        max="9999"
                        style={{
                            width: '80%',
                            padding: '15px',
                            marginBottom: '20px',
                            border: '1px solid white',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                            color: 'white',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            width: '80%',
                            padding: '15px',
                            marginBottom: '20px',
                            border: '1px solid white',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                            color: 'white',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        <option value="">Category</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                    </select>

                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        style={{
                            width: '80%',
                            padding: '15px',
                            marginBottom: '20px',
                            border: '1px solid white',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                            color: 'white',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        <option value="">Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <button type="submit" style={{
                        width: '30%',
                        padding: '15px',
                        backgroundColor: 'black',
                        color: '#FFFFFF',
                        border: '1px solid white',
                        cursor: 'pointer',
                        borderRadius: '20px',
                        marginTop: '30px',
                    }}>
                        Apply
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FilterMovies;
