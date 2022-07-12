import React, {useEffect, useState} from 'react';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import {DISCOVER_API_URL, baseImageURL} from '../config.js';
import MainDramaComp from './sections/mainDramaComp';
import GridCard from './sections/gridCard/gridCard';
import { Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

export default function Home() {

  const user = useSelector(state => state.user);
  

  const [dramas, setDramas] = useState([]);
  const [mainDrama, setMainDrama] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const APIendpoint = `${DISCOVER_API_URL}&language=en-US&with_original_language=ko&page=1`;

  useEffect( () => {
      fetchDramas(APIendpoint)   //using the custom made fetch function to fetch the dramas 
    } , [])
  
    //we need to fetch the dramas again and again hence made a function that can be used when required
  const fetchDramas = (endpoint) => {
    fetch(endpoint)
      .then(res => res.json())
      .then((data) => {
        // console.log('data.results[0] = ',data.results[0]);
        setDramas([...dramas, ...data.results]);
        setMainDrama(mainDrama || data.results[0]);
        setCurrentPage(data.page);
      }, setLoading(false))
      .catch(err => console.error('Error:', err));
  }

  const handleLoadMoreButton = () => {
    console.log('button pressed');
    let endpoint = '';
    setLoading(true);
    endpoint = `${DISCOVER_API_URL}&language=en-US&with_original_language=ko&page=${currentPage + 1}`;
    fetchDramas(endpoint);   //using the custom made fetchDrama function to fetch the updated set of dramas
  }

  return (
    <div>
      <NavBar />
      <div style={{width:'100%', margin:'0'}} className={'mainDrama'}>

        {/* cover drama image and info component */}
        {mainDrama && mainDrama.backdrop_path && 
          <MainDramaComp imageURL={`${baseImageURL}/w1280/${mainDrama.backdrop_path}`}
          title={mainDrama.name} 
          text={mainDrama.overview}
         />
        }
        
        {/* all the dramas */}
        <div style={{width:'85%', margin:'1rem auto'}} className={'all-dramas'}>
          <h2>More Asian Dramas</h2>
          <hr />
          {/* grid card making */}
          <Container style={{backgroundColor:'white'}}>
            <Row>
              {dramas && dramas.map( (drama, index) => {
                return (
                  <React.Fragment key={index}>
                    <GridCard 
                    dramaTitle={drama.name}
                    dramaImgUrl={`${baseImageURL}/w500/${drama.poster_path}`}
                    dramaId={drama.id}
                    dramaRating={drama.vote_average}
                    dramaOriginalName={drama.original_name}
                    />
                  </React.Fragment> 
                )
              } )}
            </Row>
          </Container>
          

          {/* load more button */}
          <div style={{display:'flex', justifyContent:'center'}} className={'load-more dramas'}>
          <button onClick={handleLoadMoreButton}>Load more</button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
};
