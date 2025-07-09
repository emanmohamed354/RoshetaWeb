import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Styles from './product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FetchCartContext } from './../../../Context/Cart';

export default function Product({ categoryProducts, categoryName, loading }) {

  const { AddProductToCart, deleteProductCart, cart ,getProductCart } = useContext(FetchCartContext);

    const [cartIds, setCartIds] = useState([]);
    const [loading2, setLoading2] = useState({}); 

    useEffect(() => {
      if (cart && cart.items) {
          const newCartIds = cart.items.map(item => item.productId._id);
          setCartIds(newCartIds);
      }
  }, [cart]);
  
  const handleAddToCart = async (productId, method) => {
      setLoading2(prev => ({ ...prev, [productId]: true }));
      if (method === 'post') {
          await AddProductToCart(productId);
          setCartIds(prev => [...prev, productId]);
      } else {
          await deleteProductCart(productId);
          setCartIds(prev => prev.filter(id => id !== productId));
      }
      setLoading2(prev => ({ ...prev, [productId]: false }));
      getProductCart();
  };


  return (
    <Container className={`${Styles.allProduct} mt-4`}>
      <div className={Styles.cont}>
        <h2 className={Styles.title}>{categoryName} 💊</h2>
      </div>
      <div className="row mt-3">
        {loading ? (
          <div className="text-center">
            <i className="fa-solid fa-capsules text-danger fa-spin fa-3x"></i>
          </div>
        ) : categoryProducts ? (
          <>
            {categoryProducts.map((item, index) => {
               const isCarted = cartIds.includes(item.productId);
             return (
              <div className="col-xl-3 col-6 mb-4" key={item._id}>
              
                  <Card className={Styles.card}>
                  <Link data-bs-toggle="modal" data-bs-target={`#addArtical${index}`} className='linkk'>
                    <Card.Img
                      variant="top"
                      className={[Styles.images]}
                      src={item.image}
                    />
                    <Card.Body className={Styles.text}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text className={Styles.price}>{item.price} EG</Card.Text>
                     
                    </Card.Body>
                    </Link>
                     <Button
                          variant={isCarted ? 'danger' : 'success'}
                          onClick={() => handleAddToCart(item.productId, isCarted ? 'delete' : 'post')}
                          className={`w-100 mb-2 ${isCarted ? 'btn-danger' : 'btn-success'}`} // Correctly use template literals for className
                          disabled={loading[item.productId]}
                      >
                        {loading2[item.productId] ? (
                         <i className="fa-solid fa-cart-shopping fa-spin"></i>
                        ) : (
                           <>
                           {isCarted ? "Remove from Cart" : "Add to Cart"}
                           <FontAwesomeIcon icon={faCartShopping} className={Styles.icon} />
                            </>
                         )}              
                       </Button>
                  </Card>
             
                <div
                  className="modal fade"
                  id={`addArtical${index}`}
                  tabIndex={-1}
                  aria-labelledby={`exampleModalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg"> 
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5 text-danger" id={`exampleModalLabel${index}`}>
                          {item.name}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body d-flex flex-column flex-md-row">
                        <div className="col-md-6">
                          <img
                            src={item.image}
                            className="img-fluid rounded"
                            alt={item.name}
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                          />
                        </div>
                        
                        <div className="col-md-6 ps-md-3">
                          <h4 className='text-muted'>{categoryName}</h4>
                          <p className='text-muted fs-5'><strong className='text-black'>Description:</strong> {item.description}</p>
                          <p className='text-muted fs-5'><strong className='text-black'>Quantity:</strong> {item.quantity}</p>
                          <p className='text-muted fs-5'><strong className='text-black'>Price:</strong> ${item.price}</p>
                   <Button
                          variant={isCarted ? 'danger' : 'success'}
                          onClick={() => handleAddToCart(item.productId, isCarted ? 'delete' : 'post')}
                          className={`w-100 mb-2 ${isCarted ? 'btn-danger' : 'btn-success'}`} // Correctly use template literals for className
                          disabled={loading[item.productId]}
                      >
                        {loading2[item.productId] ? (
                         <i className="fa-solid fa-cart-shopping fa-spin"></i>
                        ) : (
                           <>
                           {isCarted ? "Remove from Cart " : "Add to Cart "}
                           <FontAwesomeIcon icon={faCartShopping} className={`${Styles.icon} `} />
                            </>
                         )}              
                       </Button>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             )
          })}
          </>
        ) : (
          <div className="text-center"></div>
        )}
      </div>
    </Container>
  );
}
