import Nav from 'react-bootstrap/Nav';
import {Navbar, Container, Image} from 'react-bootstrap';
import {  useContext } from 'react';
import { Link, NavLink} from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar() { 

    const { user } = useContext(UserContext);

    return(
        <Navbar expand="lg" bg='dark'>
            <Container fluid>
             <Navbar.Brand as={Link} to="/" className='text-white'>Fitness Tracker</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/" className='text-white' exact="true">Home</Nav.Link>


                    {user.access !== null ? (
                        <>

                        <Nav.Link as={NavLink} to="/addWorkout" className='text-white' exact="true">Add Workout</Nav.Link>
                        <Nav.Link as={NavLink} to="/workouts" className='text-white' exact="true"> List of Workouts</Nav.Link>

                        </>
                    )
                    :
                    <>
                    <Nav.Link as={NavLink} to="/login" className='text-white' exact="true">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/register" className='text-white' exact="true">Register</Nav.Link>
                    </>
                }
                    
                    

                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}