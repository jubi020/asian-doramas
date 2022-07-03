import {Container, Nav, Navbar, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from 'react';
import RightMenu from "./sections/rightMenu";


export default function NavBar(){

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return(
        <>
            <Navbar collapseOnSelect expand='sm' bg='dark' variant="dark">
                <Container style={{minHeight: "0vh"}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggle"/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="nav">
                            <Nav.Link href="/" className="nav-el">Home</Nav.Link>
                            <Nav.Link href="/about" className="nav-el">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline='true' className="mx-3">{RightMenu()}</Form>
                </Container>
            </Navbar>
        </>
    );
}