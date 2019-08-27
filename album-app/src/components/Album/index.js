import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'
import PhotoCarousel from '../PhotoCaraousel';
import './album.css';

const Album = ({ album }) => {

    const [photos, setPhotos] = useState([]);
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true
      })

    useEffect(() => {
        if(inView) {   
            fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
            .then(response => response.json())
            .then(photos => setPhotos(photos))
        }
    }, [album.id, inView])

    return(
        <div ref={ref} className='album-container'>
            <div className='album-header'>
                <div className='title'>{album.title}</div>
                <div className='ids'>id: {album.id}, userId: {album.userId}</div>    
            </div>
            <div>
                <PhotoCarousel photos={photos} />
            </div>
        </div>
    )
}

export default Album;