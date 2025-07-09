import React, { useContext, useEffect, useState } from 'react'; 
import { FetchCartContext } from './../../../Context/Cart';
import { mediaContext } from './../../../Context/MediaStore';
import styles from './Cart.module.scss'; 
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Footer from '../../Ui/Footer/Footer'; 
import axios from 'axios'; 

const CartPage = () => {
    const { cart, UpdateProductCart, deleteProductCart, clearCart } = useContext(FetchCartContext);
    const { userData } = useContext(mediaContext); 
    
    const [totals, setTotals] = useState({
        subtotal: 0,
        shippingFees: 20, 
        totalPrice: 0,
    });

    const [paymentMethod, setPaymentMethod] = useState('cash');

    useEffect(() => {
        const subtotal = cart.items.reduce((acc, item) => {
            const price =  item.productId.offer? parseFloat(item.productId.price)*0.8 : parseFloat(item.productId.price);
            console.log(price)
            const count = item.quantity;

            if (!isNaN(price) && !isNaN(count)) {
                return acc + (price * count);
            }
            return acc;
        }, 0);
        
        const totalPrice = subtotal + totals.shippingFees;
        setTotals({ subtotal, shippingFees: totals.shippingFees, totalPrice });
    }, [cart.items, totals.shippingFees]);

    const handleQuantityChange = (productId, newCount, stockQuantity) => {
        const item = cart.items.find(item => item.productId._id === productId);
        if (!item) return;

        if (newCount > stockQuantity) {
            toast.error(`Cannot exceed stock quantity of ${stockQuantity} units`, {
                autoClose: 1000,
                theme: 'dark',
                position: 'bottom-center',
            });
            return;
        }

        if (newCount < 1) {
            deleteProductCart(productId);
            return;
        }

        UpdateProductCart(productId, newCount);
    };

    const handleCashPayment = async () => {
        try {
            const response = await axios.post('https://pharmacy-backend845.vercel.app/carts/payment/cash', {
                userId: userData.userId,
                items: cart.items.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                })),
            });

            toast.success(response.data.msg, {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });

            clearCart(); 
        } catch (error) {
            console.error('Payment Error:', error);
            toast.error('Payment failed. Please try again.', {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });
        }
    };

    const handleVisaPayment = async () => {
        try {
            const response = await axios.post('https://pharmacy-backend845.vercel.app/payment/create-payment', {
                userId: userData.userId,
                items: cart.items.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                })),
                paymentMethod: 'Credit Card',
            });

            if (!response.data.paymentToken) {
                throw new Error('Payment token is missing from the response.');
            }

            const orderId = response.data.orderId; 
            const paymentUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${871391}?payment_token=${response.data.paymentToken}&redirect_url=https://yourwebsite.com/payment/callback`;
            
            window.open(paymentUrl, '_blank');

            clearCart(); 
            //await completePayment(orderId);

        } catch (error) {
            console.error('Payment Error:', error);
            toast.error('Payment failed. Please try again.', {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });
        }
    };

    const completePayment = async (orderId) => {
        try {
            
            const response = await axios.get(`http://localhost:3000/payment/status/${orderId}`);
            const paymentDetails = response.data;

            if (paymentDetails.status === 'Approved') {
                toast.success('Payment completed successfully!', {
                    autoClose: 2000,
                    theme: 'dark',
                    position: 'top-center',
                });
                clearCart(); 
            } else {
                toast.error('Payment was not approved. Please check your payment status.', {
                    autoClose: 2000,
                    theme: 'dark',
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Error completing payment:', error);
            toast.error('Error completing payment. Please try again.', {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });
        }
    };

    const handlePayment = () => {
        if (paymentMethod === 'cash') {
            handleCashPayment();
        } else if (paymentMethod === 'visa') {
            handleVisaPayment();
        }
    };

    return (
        <div>
            <Container>
                <h2 className={[styles.name]}>{userData.userName ? `${userData.userName}'s Cart` : "Your Cart"}</h2>

                <div className={`row ${styles.cartContainer}`}>
                    <div className="col-12 col-lg-8">
                        {cart.items.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <div className={`${styles.cartItems}`}>
                                {cart.items.map(item => (
                                    <div key={item.productId._id} className={`row mb-3 ${styles.cartItem}`}>
                                        <div className="col-12 d-flex align-items-center">
                                            <img 
                                                src={item.productId.image} 
                                                alt={item.productId.name} 
                                                className={`img-fluid ${styles.cartItemImage}`} 
                                            />
                                            <div className={`d-flex flex-column ${styles.cartItemDetails}`}>
                                                <h4 className={styles.cartItemTitle}>{item.productId.name}</h4>
                                                <p className={styles.cartItemDescription}>{item.productId.description}</p>
                                                <p className={styles.cartItemPrice}> Price: {item.productId.offer? parseFloat(item.productId.price*0.8).toFixed(2) :parseFloat(item.productId.price).toFixed(2)} EG</p>
                                                <p className={styles.cartItemStock}>Total in Stock: {item.productId.quantity} units</p>
                                                <div className={`d-flex align-items-center ${styles.cartItemQuantity}`}>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1, item.productId.quantity)}
                                                        className={`btn btn-secondary ${styles.quantityButton}`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className={styles.quantityCount}>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1, item.productId.quantity)}
                                                        className={`btn btn-secondary ${styles.quantityButton}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => deleteProductCart(item.productId._id)} 
                                                    className={`btn btn-danger mt-4 ${styles.deleteButton}`}
                                                >
                                                    Remove From Cart <i className="fa-solid fa-cart-shopping"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className={`${styles.cartSummary}`}>
                            <h3>Cart Summary</h3>
                            <div className={styles.summaryDetails}>
                                <p>Subtotal: {totals.subtotal.toFixed(2)} EG</p>
                                <p>Shipping Fees: {totals.shippingFees} EG</p>
                                <h4>Total: {totals.totalPrice.toFixed(2)} EG</h4>
                                <p>Total Products: {cart.items.reduce((acc, item) => acc + item.quantity, 0)} units</p>
                            </div>
                            <div className={styles.paymentMethod}>
                                <h4>Select Payment Method</h4>
                                <div>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="cash" 
                                            checked={paymentMethod === 'cash'} 
                                            onChange={() => setPaymentMethod('cash')}
                                        />
                                        Cash on Delivery
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input 
                                            type="radio" 
                                            value="visa" 
                                            checked={paymentMethod === 'visa'} 
                                            onChange={() => setPaymentMethod('visa')} 
                                        />
                                        Visa / Credit Card
                                    </label>
                                </div>
                            </div>
                            <button onClick={handlePayment} className="btn btn-primary">
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default CartPage;
