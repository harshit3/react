import React from 'react';
import './photo.css';

const Photo = ({ photo }) => {
    return(
        <div className='photo-container'>
            <img src={photo.url} height='150px' width='150px' alt={`AlbumId:${photo.albumId}-Id:${photo.id}`}/>
            <div className='title'>{photo.title}</div>
            <div>id: {photo.id}</div>
        </div>
    )
}

export default Photo;