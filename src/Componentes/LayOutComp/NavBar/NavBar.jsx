import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FetchCartContext } from './../../../Context/Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

export default function NavBar() {
  const navigate = useNavigate();
  const { numOfCart } = useContext(FetchCartContext);

  const handleCart = () => {
    navigate("/Cart");
  };

  useEffect(() => {
    console.log("NavBar is re-rendering, numOfCart: ", numOfCart);
  }, [numOfCart]);


    
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
                    <Nav.Link href="#"><Link className='nav-link' to='Products'>Products</Link></Nav.Link>
                    <Nav.Link href="#"><Link className='nav-link' to='MedicalTests'>Medical Tests</Link></Nav.Link>
                    <Nav.Link href="#"><Link className='nav-link' to='MedicalTourism'>Medical Tourism</Link></Nav.Link>


            
            </Nav>
            <Form className="d-flex justify-content-end  w-25 pe-4">
              
              
                  <>
                    <Link to="Login"><button className='btn btn-info my-2'>LogIn</button></Link>
                    <Link to="SignUp"><button className='btn btn-success  ms-5 my-2'>SignUp</button></Link>
                    <IconButton aria-label="cart" className='me-4' onClick={handleCart}>
                      <Badge badgeContent={numOfCart} color="success">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </>
             
            </Form>
            </Navbar.Collapse>
        </Container>
       </Navbar>

    
    </>
  )
}
