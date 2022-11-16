import React from 'react'
import { movies } from '../getMovies'
import './styles.css'

export function Banner() {

  const movie=movies.results[0];

  return (
    <div className='card banner-card-container'>
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className='card-img-top banner-img' alt="Movie Banner"/>
        <div className='card-body banner-card'>
            <h2 className='card-title banner-title'>{movie.original_title}</h2>
            <p className='card-text banner-text'>{movie.overview}</p>
        </div>
    </div>
  )
}

export default Banner