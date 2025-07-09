import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavBar() {


    
  return (
    <>
       <Navbar expand="lg" className="bg-body-secondary     -tertiary">
        <Container fluid>
            <Navbar.Brand href="#" className='fw-bold fs-4 text-muted  '>Rosheta</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto  my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
               
            
                    <Nav.Link href="#"><Link className='nav-link' to=''>Home</Link></Nav.Link>
            
            </Nav>
            <Form className="d-flex justify-content-end  w-25 pe-4">
              
              
                  <>
                    <Link to="Login"><button className='btn btn-info my-2'>LogIn</button></Link>
                    <Link to="SignUp"><button className='btn btn-success  ms-5 my-2'>SignUp</button></Link>
                  </>
             
            </Form>
            </Navbar.Collapse>
        </Container>
       </Navbar>

    
    </>
  )
}
