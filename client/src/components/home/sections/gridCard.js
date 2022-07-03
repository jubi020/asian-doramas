import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseImageURL } from '../../config';


export default function GridCard(props) {

    // console.log('props in GridCard are',props.dramas);
    const {dramas} = props;
    // console.log(dramas[1]);
    const drama = dramas[1];
    // console.log(drama);
    // const dramaImgUrl = `${baseImageURL}/w185/${}`

  return (
    <div>
        <h2>from the gridcard component</h2>
        <Container style={{backgroundColor:'grey', color:'white', minHeight:'10vh'}}>
            <Row>
              {dramas && dramas.map((drama, index) => {
                console.log(drama.name, index);
                <div>
                  <h2>title:{drama.name}</h2>
                </div>
              })}
            </Row>
</Container>
    </div>
  )
}

{/* <Container style={{backgroundColor:'grey', color:'white'}}>
            <Row>
              {dramas.length > 0 && dramas.map((drama, index) => {
                console.log(drama.name, index);
                <Col lg={6} sm={8} xs={24}>
                  <div>
                    <h2 style={{color:'black'}}>fgdfgsdfg{}</h2>
                  </div>
                </Col>
              })}
            </Row>
</Container> */}



{/* <Container style={{backgroundColor:'grey'}}>
            <Row> */}
            // {dramas.length > 0 && dramas.map((drama, index) => {
            //   const dramaTitle = drama.name;
            //   console.log(dramaTitle, index);
            //     // <Col >
            //       <div>
            //         <h2 style={{color:'black'}}>hello everyone</h2>
            //       </div>
            //     // </Col>
              
            // })}
          {/* </Row>
      </Container> */}