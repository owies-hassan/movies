import {useEffect, useState} from "react";
import ControllerWithGenres from "../../Components/ControllerWithGenres/ControllerWithGenres";
import Genres from "../../Components/Genres/Genres";
import ViewTrending from "../../Components/viewTrending/viewTrending";
import Pagination from "../../Components/Pagination/Pagination";


const Series=()=>{
    const[movies,setMoives]=useState([]);
    const[pageMovies,setPageMovies]=useState(2);
    const[totalPages,setTotalPages]=useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const urlGenres=ControllerWithGenres(selectedGenres);
    const FetchMovies=async ()=>{
        const fetchMovies=await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=801ba50f957f0f9e83c96ce7332f7941&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageMovies}&with_genres=${urlGenres}`)
        const res=await fetchMovies.json()
        setMoives(res.results)
        setTotalPages(res.total_pages)
    };

    useEffect(()=>{

        FetchMovies()
    },[pageMovies,urlGenres])
    // console.log(movies)
    return(
        <div>
            <Genres
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setTotalPages={setTotalPages}
                type='tv'
            />
            <div className='d-flex flex-wrap gap-1 '>

                {movies&& movies.map(item => {
                    return (
                        <ViewTrending
                            type='tv'
                            key={item.id}
                            id={item.id}
                            img={item.poster_path}
                            title={item.original_title?item.original_title:item.name}
                            media='tv'
                            date={item.release_date?item.release_date:item.first_air_date}
                            vote={item.vote_average}
                        />
                    )
                })}
                <Pagination page={pageMovies} setPage={setPageMovies} totalPages={totalPages} />
            </div>
        </div>
    )
}
export default Series