import React, {useEffect, useState} from 'react';
import NavBar from '../navbar/navbar';
import Footer from '../views/footer/footer';
import {DISCOVER_API_URL, baseImageURL} from '../config.js';
import MainDramaComp from './sections/mainDramaComp';
import GridCard from './sections/gridCard/gridCard';
import { Container, Row} from 'react-bootstrap';
// import{Row} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {

  const [dramas, setDramas] = useState([]);
  const [mainDrama, setMainDrama] = useState({});
  const [loading, setLoading] = useState(true);

  const APIendpoint = `${DISCOVER_API_URL}&language=en-US&with_original_language=ko&page=1`;

  useEffect( () => {
      fetch(APIendpoint)
      .then(res => res.json())
      .then((data) => {
        // console.log('data.results[0] = ',data.results[0]);
        setDramas(data.results);
        setMainDrama(data.results[0])
      }, setLoading(false))
      .catch(err => console.error('Error:', err));
    } , [])
  
  return (
    <div>
      <NavBar />
      <div style={{width:'100%', margin:'0'}}>

        {/* cover drama image and info component */}
        {mainDrama.backdrop_path && 
          <MainDramaComp imageURL={`${baseImageURL}/w1280/${mainDrama.backdrop_path}`}
          title={mainDrama.name} 
          text={mainDrama.overview}
         />
        }
        
        {/* all the dramas */}
        <div style={{width:'85%', margin:'1rem auto'}}>
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
          <div style={{display:'flex', justifyContent:'center'}}>
          <button>Load more</button>
          </div>
          


        </div>

      </div>
      <Footer />
    </div>
  )
};
