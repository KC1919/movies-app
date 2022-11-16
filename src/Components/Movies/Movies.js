import React, { useState, useEffect } from 'react'
// import {movies} from '../getMovies';
import './styles.css'
import axios from 'axios'

export function Movies() {

    const [movies, setMovies] = useState([]);
    const [currPage, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState([1]);

    // const movieList=movies.results;

    useEffect(() => {
        fetchData();
    }, [currPage])

    let fetchData = async (page) => {
        page = page == undefined ? currPage : page;
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=87c61773a4634f722b3abebe4315b690&language=en-US&page=${page}`)
        let fetchedMovies = res.data.results;
        console.log(fetchedMovies);
        setMovies(fetchedMovies)
    }

    //fetching stored favorite movies in local storage
    let favs = JSON.parse(localStorage.getItem("favorites"));

    const handleHover = (e) => {
        const ele = e.target;
        ele.classList.add('btn-primary');
    }

    const handleOut = (e) => {
        const ele = e.target;
        ele.classList.remove('btn-primary');
    }

    //functionality of add to favorites
    const handleFavorite = (e) => {
        const movieId = e.target.id;

        const favMovie = movies.filter(movie => {
            return movie.id == movieId;
        })[0];

        if (favs) {

            let flag = 0;

            favs.forEach(movie => {
                if (movie.id == movieId) {
                    flag = 1;
                    return;
                }
            })

            if (flag == 0) {
                favs.push(favMovie);
            }
        }

        else {
            favs = [favMovie];
        }

        localStorage.setItem("favorites", JSON.stringify(favs));
    }

    const handleNextPage = (e) => {
        setPage(currPage + 1);
        let narr = [];
        for (let i = 1; i <= totalPage.length + 1; i++) {
            narr.push(i);
        }
        setTotalPage([...narr]);

        fetchData();
    }

    const handlePrevPage = (e) => {
        if (currPage > 1) {
            setPage(currPage - 1);
            fetchData();
        }
    }

    const goToPage = (e) => {
        const page = Number(e.target.innerText);
        setPage(page);
        fetchData(page);
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', marginTop: '1.5rem' }}>Trending Now</h2>
            {
                movies.length == 0 ?
                    <div className="spinner-border" role="status" style={{ textAlign: 'center' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div> :

                    <div className='movie-cards-container'>
                        {
                            movies.map(movie => (
                                <div key={movie.id} className='card card-container'>
                                    <div className='image-card'>
                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className='movie-img' style={{ width: '100%', height: '80%' }} alt="Movie Banner" />
                                    </div>
                                    <div className='card-body details-card'>
                                        <h5 className='card-title movie-title'>{movie.original_title}</h5>
                                        <button id={movie.id} className='btn btn-sm responsive-width' onMouseOver={handleHover} onMouseOut={handleOut} onClick={handleFavorite} >Add to Favorites</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" onClick={handlePrevPage}>Previous</a>
                    </li>
                    {
                        totalPage.map((page) => (
                            <li key={page} className="page-item"><a className="page-link" onClick={goToPage}>{page}</a></li>
                        ))
                    }
                    <li className="page-item">
                        <a className="page-link" onClick={handleNextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Movies