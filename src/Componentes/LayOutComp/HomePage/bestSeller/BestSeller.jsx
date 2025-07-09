import React, { useEffect, useState, useContext } from 'react'; // Import useContext
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Styles from './BestSeller.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FetchCartContext } from './../../../../Context/Cart';

function BestSeller() {
    const { AddProductToCart, deleteProductCart, cart, getProductCart } = useContext(FetchCartContext);
    const [bestSellerCounts, setBestSellerCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartIds, setCartIds] = useState([]);
    const [loadingMap, setLoadingMap] = useState({});

    useEffect(() => {
        if (cart && cart.items) {
            const newCartIds = cart.items.map(item => item.productId._id);
            setCartIds(newCartIds);
        }
    }, [cart]);

    const handleAddToCart = async (productId, method) => {
        setLoadingMap(prev => ({ ...prev, [productId]: true }));

        try {
            if (method === 'post') {
                await AddProductToCart(productId);
                setCartIds(prev => [...prev, productId]);
            } else {
                await deleteProductCart(productId);
                setCartIds(prev => prev.filter(id => id !== productId));
            }
            await getProductCart();
        } catch (error) {
            console.error("Error handling cart action:", error);
        } finally {
            setLoadingMap(prev => ({ ...prev, [productId]: false }));
        }
    };

    const fetchBestSellerCounts = async () => {
        try {
            const response = await axios.get('https://pharmacy-backend845.vercel.app/products/getAllProducts');
            const allProducts = response.data.allProducts;
            const bestSellerItems = allProducts.filter(item => item.bestSeller === true);
            setBestSellerCounts(bestSellerItems);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBestSellerCounts();
    }, []);

    if (loading) return <Container><i className="fa-solid fa-capsules text-danger fa-spin fa-3x d-block mx-auto text-center mt-4"></i></Container>;
    if (error) return <Container><p>Error: {error}</p></Container>;

    return (
        <Container className="mt-4">
            <div className={Styles.cont}>
                <h2 className={Styles.title}>{"Our Best Seller "}</h2>
                <h5 className={Styles.all}>{"See All Products "} <FontAwesomeIcon icon={faArrowRight} size="1x" /></h5>
            </div>
            <div className="row">
                {bestSellerCounts.slice(0, 12).map((item) => {
                    const isCarted = cartIds.includes(item._id); // Check if item._id is in cartIds
                    const isLoading = loadingMap[item._id];

                    return (
                        <div className="col-xl-2 col-md-4 col-6 mb-3" key={item._id}>
                            <Card className={Styles.card}>
                                <Card.Title className={[Styles.text, Styles.category]}>{item.category}</Card.Title>
                                <div className={Styles.BestSeller}>BestSeller</div>
                                <Card.Img variant="top" className={[Styles.images]} src={item.image} />
                                <Card.Body className={Styles.cardBody}>
                                    <br />
                                    <Card.Title className={Styles.text}>{item.name}</Card.Title>
                                    <Card.Text className={[Styles.text, Styles.price, 'mb-3']}>
                                        {item.price} EG
                                    </Card.Text>
                                    <div className={[Styles.contain]}>
                                        <div className={[Styles.heart]}><FontAwesomeIcon icon={faHeart} className={Styles.ii} /></div>
                                        <Button
                                            variant={isCarted ? 'danger' : 'success'}
                                            onClick={() => handleAddToCart(item._id, isCarted ? 'delete' : 'post')} // Use item._id here
                                            className={`w-80 ${isCarted ? 'btn-danger' : Styles.button}`} // Fixed className
                                            disabled={isLoading} // Disable if loading
                                        >
                                            {isLoading ? (
                                                <i className="fa-solid fa-cart-shopping fa-spin"></i>
                                            ) : (
                                                <>
                                                    {isCarted ? "Remove" : "Add to"}
                                                    <FontAwesomeIcon icon={faCartShopping} className={Styles.icon} />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default BestSeller;
