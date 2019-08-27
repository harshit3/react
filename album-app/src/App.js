import React, { useState, useEffect } from 'react';
import Album from './components/Album';
import './App.css';

function App() {

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(albums => setAlbums(albums))
  }, [])

  return (
    <div className="App">
      {albums.map(album => <Album key={album.id} album={album}/>)}
    </div>
  );
}

export default App;
