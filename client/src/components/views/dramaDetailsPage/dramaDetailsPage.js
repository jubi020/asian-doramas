import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {API_KEY, baseImageURL} from '../../config.js';
import NavBar from '../../navbar/navbar.js';
import '../dramaDetailsPage/dramaDetailsPage.css';
import Favourite from './sections/favourite.js';


export default function DramaDetailsPage(props) {

    const [dramaDetails, setDramaDetails] = useState(null);

    const params = useParams();
    const dramaId = params.dramaId;
    
    useEffect( () => {
        const endpoint = `https://api.themoviedb.org/3/tv/${dramaId}?api_key=${API_KEY}&language=en-US`;
        fetch(endpoint)
        .then(res => res.json())
        .then((data) => {
            setDramaDetails(data);
        });
    }, []);

    

    const dramaBackdropUrl = dramaDetails && `${baseImageURL}/w780/${dramaDetails.backdrop_path}`;
    const dramaPosterUrl = dramaDetails && `${baseImageURL}/w500/${dramaDetails.poster_path}`;
    const dramaTitle = dramaDetails && `${dramaDetails.name}`;
    const dramaOriginalTitle = dramaDetails && `${dramaDetails.original_name}`;
    const dramaDesc = dramaDetails && `${dramaDetails.overview}`;
    const dramaRating = dramaDetails && `${dramaDetails.vote_average}`
    const dramaAirDate = dramaDetails && dramaDetails.first_air_date;
    const dramaTotalEpisodes = dramaDetails && dramaDetails.number_of_episodes;
    const dramaGenres = dramaDetails && dramaDetails.genres;

    return (
        (dramaDetails ? 
        <div className='drama-details' style={{position:'relative'}}>
            <div className='container-div backdrop'
            style={{backgroundImage: `url(${dramaBackdropUrl})`}}> 
            </div>
            <NavBar/>
            <div className='title-data'>
                <div className='title-poster'>
                    <img className='drama-image' src={dramaPosterUrl} />
                </div>
                <div className='title-content'>
                    <div className='drama-title'>
                        <h4>{dramaTitle} <br /> {(dramaOriginalTitle!==dramaTitle)?dramaOriginalTitle:''}</h4>
                    </div>
                    <div className='mt-4'>
                        <h5>Rating : {dramaRating}/10 <span className='bi bi-star-fill' style={{color:'#ff8000'}}></span>
                        </h5>
                    </div>
                    <div className='mt-4'>
                        <h5>Air Date : {dramaAirDate}</h5>
                    </div>
                    <div className='mt-4'>
                        <h5>Total Episodes : {dramaTotalEpisodes}</h5>
                    </div>
                    <div className='mt-4'>
                        <h6>Genres :&nbsp;
                            { dramaGenres && 
                                dramaGenres.map( (genre) => {
                                    return (" 🔆 " + genre.name);
                                })
                            }
                        </h6>
                    </div>
                    <div className='drama-description mt-3'>{dramaDesc}</div>
                    <div className='favorite mt-4'>
                        <Favourite 
                            userFrom={localStorage.getItem('userId')}
                            dramaId={dramaId}
                            dramaTitle={dramaTitle}
                            dramaImage={dramaDetails.poster_path}
                            dramaOverview={dramaDesc}
                        />
                    </div>
                </div>
            </div>

        </div>
        :
        <div className='no-drama'>
            <div className='p-4 m-3'><h5>No such drama found</h5></div>
        </div>)
    )
};
