import {Container, Nav, Navbar, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from 'react';
import RightMenu from "./sections/rightMenu";
import { useSelector } from "react-redux";

export default function NavBar(){

    const user = useSelector(state => state.user);

    return(
        <>
            <Navbar collapseOnSelect expand='sm' bg='dark' variant="dark">
                <Container style={{minHeight: "0vh"}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggle"/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="nav">
                            <Nav.Link href="/" className="nav-el">Home</Nav.Link>
                            <Nav.Link href="/about" className="nav-el">About</Nav.Link>
                            {window.localStorage.getItem('userId') != null 
                            && <Nav.Link href="/favourite" className="nav-el">Favourites</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline='true' className="mx-3">
                        {RightMenu()}
                    </Form>
                </Container>
            </Navbar>
        </>
    );
}