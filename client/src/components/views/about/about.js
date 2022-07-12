import React from 'react';
import Footer from "../../footer/footer";
import NavBar from '../../navbar/navbar';

export default function About() {
    
  return (
    <>
      <NavBar />
      <div style={{width:'85%', margin:'3rem auto', minHeight:'70vh'}}>
        <h1>Hello,</h1>
        <h4>
          This is a minimalistic website for asian drama fans who love to watch 
          and explore asian dramas. This website will help all such fans to get the information related to 
          different dramas all in one place which will help them in identifying the one's that resonate with them
          and they would like to watch.
          The users can also wishlist their favourite dramas and check them out later in a minimalistic way in just a few clicks.
          Hope it will help all the asian drama fans like me!
          <br />
          <br />
          From an asian-drama fan!!
        </h4>
      </div>
      <Footer />
    </> 
    
  );
};
