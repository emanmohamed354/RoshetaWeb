import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BaseUrl } from "../Componentes/BaseUrl/base";
import { mediaContext } from "./MediaStore";

export const FetchCartContext = createContext();

export default function FetchCartProvider(props) {
    const notify = (msg, type) => {
        toast[type](msg, {
            autoClose: 1000,
            theme: 'dark',
            position: 'bottom-center'
        });
    };

    const [cart, setCart] = useState({ items: [] });
    const [numOfCart, setNumOfCart] = useState(0);
    const { userData } = useContext(mediaContext);
    const token = localStorage.getItem('token');

    const AddProductToCart = async (productId) => {
        try {
            await axios.post(`${BaseUrl}/carts/addProductToCart`, { productId }, {
                headers: { 'token': token }
            });
            console.log(productId)
            notify('Product Added To Cart', 'success');
            getProductCart(); 
        } catch (error) {
            const message = error.response?.data?.message || 'Error adding product to cart';
            console.error(message, error);
            notify(message, 'error');
        }
    };

    const getProductCart = async () => {
        try {
            const { data } = await axios.get(`${BaseUrl}/carts/getCartForUser`, {
                headers: { 'token': token }
            });
            
            // Add safety checks here
            if (data && data.cart) {
                setCart(data.cart);
                if (data.cart.items && Array.isArray(data.cart.items)) {
                    calculateNumOfCart(data.cart.items);
                    setNumOfCart(data.cart.items.length);
                } else {
                    // If items doesn't exist or isn't an array
                    setCart({ ...data.cart, items: [] });
                    setNumOfCart(0);
                }
            } else {
                // If no cart data
                setCart({ items: [] });
                setNumOfCart(0);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            // Set default values on error
            setCart({ items: [] });
            setNumOfCart(0);
        }
    };

    const calculateNumOfCart = (items) => {
        if (!items || !Array.isArray(items)) {
            setNumOfCart(0);
            return;
        }
        const totalCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setNumOfCart(totalCount);
    };

    useEffect(() => {
        if (localStorage.getItem("token") && userData !== '') {
            getProductCart()
        }
    }, [userData])

    const deleteProductCart = async (productId) => {
        try {
            await axios.delete(`${BaseUrl}/carts/removeProductFromCart/${productId}`, {
                headers: { 'token': token }
            });
            setCart((prevCart) => {
                const updatedItems = prevCart.items.filter(item => item.productId._id !== productId);
                calculateNumOfCart(updatedItems); 
                return { ...prevCart, items: updatedItems };
            });
            notify('Product Deleted From Cart', 'success');
        } catch (error) {
            notify('Error deleting product from cart', 'error');
        }
    };

    const UpdateProductCart = async (productId, quantity) => {
        try {
            await axios.put(`${BaseUrl}/carts/updateProductQuantityInCart`, { productId, quantity }, {
                headers: { 'token': token }
            });
            notify(`Product ${quantity} updated`, 'success');
            getProductCart();
        } catch (error) {
            const message = error.response?.data?.msg || 'Error updating product quantity';
            notify(message, 'error');
        }
    };
    
    const clearCart = async () => {
        try {
            await axios.delete(`${BaseUrl}/carts/clearCart`, {
                headers: { 'token': token }
            });
            setCart({ items: [] });
            setNumOfCart(0);
            notify('Products cleared from cart', 'success');
        } catch (error) {
            notify('Error clearing cart', 'error');
        }
    };

    return (
        <FetchCartContext.Provider value={{
            AddProductToCart, cart, setCart, getProductCart,
            numOfCart, deleteProductCart, UpdateProductCart, clearCart
        }}>
            {props.children}
        </FetchCartContext.Provider>
    );
}