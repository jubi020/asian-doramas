import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
export default function NavBar(){
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
                </Container>
            </Navbar>
        </>
    );
}