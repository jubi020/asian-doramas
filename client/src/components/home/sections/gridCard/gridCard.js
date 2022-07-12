import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../gridCard/gridCard.css";
import {Link} from 'react-router-dom';


export default function GridCard(props) {

  const {dramaTitle, dramaImgUrl, dramaId, dramaRating, index, dramaOriginalName} = props;
  // console.log(dramaTitle, dramaId, dramaImgUrl);

  return(
      <>
        <Col key={index}>
          
            <div style={{color:'rgb(233, 150, 122)', 
            // backgroundColor:'white',
            // background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), url(${dramaImgUrl}), #1c1c1c`
            }}>
              <Link to={`/drama/${dramaId}`}>
              <Card  bg='dark' style={{width: '15rem'}}>
              <Card.Img variant="top" src={`${dramaImgUrl}`} alt={'drama poster'}/>
                <Card.Body>
                  <Card.Title><b>{dramaTitle}</b></Card.Title>
                  <Card.Text>
                    <p>{dramaOriginalName}</p>
                    <p>
                      Rating: <b>{dramaRating}/10</b> <span className='bi bi-star-fill' style={{color:'#ff8000'}}></span>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Link>
            </div>
          
          <br />
        </Col>
      </>
  )
};


{/* <h3>title: {dramaTitle}</h3>
            <img src={`${dramaImgUrl}`}></img> */}