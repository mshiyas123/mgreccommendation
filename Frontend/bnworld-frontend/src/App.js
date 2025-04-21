import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Movies from './components/Movies';
import Games from './components/Games';
import AddMovie from './components/AddMovie';
import AddGame from './components/AddGame';
import FilterMovies from './components/FilterMovies';
import FilterGames from './components/FilterGames';
import FilteredMovies from './components/FilteredMovies';
import FilteredGames from './components/FilteredGames';

function Navigation() {
    const location = useLocation();

    if (location.pathname !== '/') {
        return null;
    }

    return (
        <div
            style={{
                backgroundColor: 'black',
                color: 'white',
                fontFamily: 'Arial, sans-serif',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
        >
            <div style={{ border: '2px solid white', padding: '40px', borderRadius: '10px' }}>
                <h1 style={{ marginBottom: '30px' }}>Movies and Games Recommendation System</h1>
                <p style={{ marginBottom: '30px', color: '#d3d3d3' }}>
                    A list of recommended movies and games
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <Link to="/movies" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                        padding: '10px 20px',
                        marginBottom: '30px',
                        width: '180px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                        <img src="/icons/video.png" alt="Movies Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        Movies
                    </Link>

                    <Link to="/games" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                        padding: '10px 20px',
                        width: '180px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                        <img src="/icons/console.png" alt="Games Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        Games
                    </Link>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
                <Navigation />
                <Routes>
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                    <Route path="/add-game" element={<AddGame />} />
                    <Route path="/filter-movies" element={<FilterMovies />} />
                    <Route path="/filter-games" element={<FilterGames />} />
                    <Route path="/filtered-movies" element={<FilteredMovies />} />
                    <Route path="/filtered-games" element={<FilteredGames />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
