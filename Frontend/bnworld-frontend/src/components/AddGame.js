import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddGame() {
  const [gameData, setGameData] = useState({
    gameName: '',
    yearOfRelease: '',
    genre: '',
    rating: '',
    imageFilename: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData({ ...gameData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('gameName', gameData.gameName);
    formData.append('yearOfRelease', gameData.yearOfRelease);
    formData.append('genre', gameData.genre);
    formData.append('rating', gameData.rating);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:8080/games', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Game added successfully!');
        navigate('/games');
      } else {
        alert('Failed to add game. Please try again.');
      }
    } catch (error) {
      console.error('Error adding game:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const goBack = () => {
    navigate('/games');
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', fontFamily: 'Arial, sans-serif', minHeight: '100vh', margin: 0 }}>
      {/* Back Button */}
      <button
        onClick={goBack}
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

      {/* Form Container */}
      <div style={{ backgroundColor: 'black', border: '1px solid white', borderRadius: '10px', padding: '20px', paddingTop: '100px', width: '500px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', marginTop: '70px', marginLeft: '500px', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', margin: 0 }}>ADD GAME</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Game Name"
            name="gameName"
            value={gameData.gameName}
            onChange={handleChange}
            required
            style={{ width: '80%', padding: '15px', marginBottom: '30px', border: '1px solid white', borderRadius: '5px', backgroundColor: 'black', color: 'white', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <input
            type="number"
            placeholder="Year of Release"
            name="yearOfRelease"
            value={gameData.yearOfRelease}
            onChange={handleChange}
            min="1000"
            max="9999"
            required
            style={{ width: '80%', padding: '15px', marginBottom: '30px', border: '1px solid white', borderRadius: '5px', backgroundColor: 'black', color: 'white', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <select
            name="genre"
            value={gameData.genre}
            onChange={handleChange}
            required
            style={{ width: '80%', padding: '15px', marginBottom: '30px', border: '1px solid white', borderRadius: '5px', backgroundColor: 'black', color: 'white', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <option value="" disabled>Category</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Puzzle">Puzzle</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Sports">Sports</option>
          </select>
          <select
            name="rating"
            value={gameData.rating}
            onChange={handleChange}
            required
            style={{ width: '80%', padding: '15px', marginBottom: '30px', border: '1px solid white', borderRadius: '5px', backgroundColor: 'black', color: 'white', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <option value="" disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="game-image" style={{ display: 'block', textAlign: 'left', width: '80%', margin: '0 auto 10px auto' }}>Game Image:</label>
          <input
            type="file"
            id="game-image"
            name="game-image"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{ width: '80%', padding: '15px', marginBottom: '30px', border: '1px solid white', borderRadius: '5px', backgroundColor: 'black', color: 'white', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <button
            type="submit"
            style={{
              width: '30%',
              backgroundColor: 'black',
              color: '#FFFFFF',
              border: '1px solid white',
              cursor: 'pointer',
              padding: '15px',
              borderRadius: '20px',
              transition: 'background-color 0.3s',
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGame;
