import React, { useState, useEffect } from 'react';
import Photo from '../Photo';
import './photocarousel.css';

const PhotoCarousel = ({ photos }) => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pageLength ] = useState(5) //carousel will contain pageLength number of images at a time
    const [ displayPhotos, setDisplayPhotos ] = useState([]);

    useEffect(() => {
        setDisplayPhotos(photos.slice(pageLength*currentPage-pageLength, pageLength*currentPage))
    }, [currentPage, pageLength, photos])

    const prevPage = () => {
        setCurrentPage(currentPage-1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage+1)
    }

    return(
        <div className='caraousel-container'>
            {displayPhotos.map(photo => {
                return <Photo key={photo.id} photo={photo} />
            })}
            {!(currentPage===1)
                ?<div className='button prevButton' onClick={prevPage}><i className="fa fa-angle-left"></i></div>
                :null
            }
            {!(currentPage===Math.ceil(photos.length/pageLength))
                ?<div className='button nextButton' onClick={nextPage}><i className="fa fa-angle-right"></i></div>
                :null
            }
        </div>
    );
}

export default PhotoCarousel;