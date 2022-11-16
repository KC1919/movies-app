import React, { useState , useEffect } from 'react'
import './styles.css'

export function Favorites(props) {

    const genreIds={28:"Action",12:"Adventure",35:"Comedy",80:"Crime",18:"Drama",14:"Fantasy",27:"Horror",10749:"Romance"}
    
    const favs=JSON.parse(localStorage.getItem("favorites"));

    //updating the state of favorite movies
    const [favMovies,setFavMovies]=useState(favs==null?[]:favs)
    const [movies,setMovies]=useState(favs==null?[]:favs);
    const [pageLimit, setPageLimit]=useState(5);
    const [currPage, setPage] = useState([1]);
    const [totalPage, setTotalPage] = useState([1]);
    const [currText,setCurrText]= useState('');

    useEffect(()=>{ 
        let allGenreEle=document.querySelector(".active");
        allGenreEle.click();
    },currPage)

    //passing currPage state in useEffect means , whenever the currPage state will change the 
    // useEffect will run, by default useEffect runs only once when the component is rendered

    //functionality to delete a movie from favorites list
    const handleDelete=(e)=>{

        const movieId=e.target.id;

        let rarr=movies.filter(movie=>{
            return movie.id!=movieId;
        });

        setMovies([...rarr]);

        let narr=favMovies.filter(movie=>{
            return movie.id!=movieId;
        });

        setFavMovies([...narr]);

        localStorage.setItem("favorites",JSON.stringify(narr));
    }

    //filter movies by genre
    const handleGenreClick=async (e)=>{

        const listEle=e.target;

        //extract the genre
        let genre=listEle.innerText;
        
        let genreList=document.querySelector(".list-group").children;

        for(let i=0;i<genreList.length;i++){
            if(genreList[i].classList.contains("active")){
                genreList[i].classList.remove("active");
            }
        }
        listEle.classList.add("active");

        //filter all the movies with the input genre
        let genreMovies=favMovies.filter(movie=>{
            if(genre=="All Genres")
                return true;
            
            return genreIds[movie.genre_ids[0]]==genre;
        })

        //update the movies state with current genre movies
        setMovies([...genreMovies]);

        //total number of current genre movies
        let total=genreMovies.length;

        //calculate the number of pages, page limit denotes no. of rows on each page
        let pages=Math.ceil(total/pageLimit);

        //holds the number of pages
        let pageCount=[];
        for(let i=1;i<=pages;i++){
            pageCount.push(i);
        }

        //update the state of total number of pages, to show pagination on UI
        setTotalPage([...pageCount]);

        //calculate the start index and end index for each movie page
        let si=(currPage-1)*pageLimit;
        let ei=si+pageLimit;

        //collect all the genre movies
        let narr=[...genreMovies];

        //slice the movies for a particular page
        narr=narr.slice(si,ei);

        //set the current sliced movies list for a page 
        setMovies([...narr])
    }

    const goToPage = (e) => {
        const page = Number(e.target.innerText);
        setPage([page]);
    }

    const handleSearch=(e)=>{
        
        setCurrText(e.target.value)

        let searchTitle=e.target.value;

        if(searchTitle!=''){
            let searched=movies.filter((movie)=>{
                let title=movie.original_title.toLowerCase();
                return title.includes(searchTitle.toLowerCase());
            })
            
            setMovies([...searched]);
        }

        else{
            let listItems=document.querySelectorAll(".list-group-item");
            listItems.forEach(item=>{
                if(item.classList.contains("active")){
                    item.click();
                    return;
                }
            })
        }
    }

    const sortAscPopularity=(e)=>{
        let temp=movies;

        temp.sort(function(a,b){
            return a.popularity-b.popularity;
        })

        setMovies([...temp]);
    }

    const sortDescPopularity=(e)=>{
        let temp=movies;

        temp.sort(function(a,b){
            return b.popularity-a.popularity;
        })

        setMovies([...temp]);
    }

    const sortAscRating=(e)=>{
        let temp=movies;

        temp.sort(function(a,b){
            return a.vote_average-b.vote_average;
        })

        setMovies([...temp]);
    }

    const sortDescRating=(e)=>{
        let temp=movies;

        temp.sort(function(a,b){
            return b.vote_average-a.vote_average;
        })

        setMovies([...temp]);
    }

    return (
        <>
            <div className='container'>
                <div className='genre-container'>
                    <ul className="list-group">
                        <li style={{cursor:'pointer'}} className="list-group-item active font" onClick={handleGenreClick} aria-current="true">All Genres</li>
                        <li style={{cursor:'pointer'}} className="list-group-item font" onClick={handleGenreClick}>Action</li>
                        <li style={{cursor:'pointer'}} className="list-group-item font" onClick={handleGenreClick}>Horror</li>
                        <li style={{cursor:'pointer'}} className="list-group-item font" onClick={handleGenreClick}>Adventure</li>
                        <li style={{cursor:'pointer'}} className="list-group-item font" onClick={handleGenreClick}>Comedy</li>
                    </ul>
                </div>

                <div className='data-container'>
                    <div className='search-container'>
                        <input className='font' type="text" name='search' placeholder='Search' onChange={handleSearch}/>
                        <input className='font' type="text" placeholder='rows per page' onChange={(e)=>{
                            setPageLimit(e.target.value==0?5:e.target.value);
                        }}/>
                    </div>

                    <div className='movies-container'>
                        <table className='table-cont' style={{width:'100%'}}>
                            <thead id='table-head'>
                                <tr>
                                    <th className='title font'># Title</th>
                                    <th className='genre font'>Genre</th>
                                    <th className='popularity font'><i className="fa fa-sort-asc" aria-hidden="true" onClick={sortAscPopularity}/>Popularity<i className="fa fa-sort-desc" aria-hidden="true" onClick={sortDescPopularity}/></th>
                                    <th className='rating font'><i className="fa fa-sort-asc" aria-hidden="true" onClick={sortAscRating}/>Rating<i className="fa fa-sort-desc" aria-hidden="true" onClick={sortDescRating}/></th>
                                </tr>
                            </thead>
                                
                            <tbody>
                            {
                                movies && movies.map(movie=>(
                                    <tr key={movie.id}>
                                        <td className='title font'><div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} /> <p className='title-text'>{movie.title}</p></div></td>
                                        <td className='genre font'>{genreIds[movie.genre_ids[0]]==undefined?"NA":genreIds[movie.genre_ids[0]]}</td>
                                        <td className='popularity font'>{movie.popularity}</td>
                                        <td className='rating font'>{movie.vote_average}</td>
                                        <td className='delete font'><button id={movie.id} onClick={handleDelete} className='delete-btn btn btn-danger'>Delete</button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <nav aria-label="Page navigation example" style={{marginTop:'2rem'}}>
                <ul className="pagination justify-content-center">
                    {
                        totalPage.map((page)=>(
                            <li key={page} className="page-item"><a className="page-link" onClick={goToPage}>{page}</a></li>
                        ))
                    }
                </ul>
            </nav>  
        </>
  )
}

export default Favorites;