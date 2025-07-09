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
            notify('Product Added To Cart', 'success');
            getProductCart(); // Refresh cart after adding
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
            setCart(data.cart);
            // Calculate total number of items in the cart
            calculateNumOfCart(data.cart.items); // Update numOfCart after fetching
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const calculateNumOfCart = (items) => {
        // Calculate the total number of items in the cart
        const totalCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setNumOfCart(totalCount);
    };

    useEffect(() => {
        if (token && userData !== '') {
            getProductCart();
        }
    }, [userData, token]);

    const deleteProductCart = async (productId) => {
        try {
            await axios.delete(`${BaseUrl}/carts/removeProductFromCart/${productId}`, {
                headers: { 'token': token }
            });
            setCart((prevCart) => {
                const updatedItems = prevCart.items.filter(item => item.productId._id !== productId);
                calculateNumOfCart(updatedItems); // Recalculate numOfCart after deletion
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
            notify(`Product count updated`, 'success');
            getProductCart(); // Refresh cart after updating
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
            setNumOfCart(0); // Reset the number of items in the cart
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
