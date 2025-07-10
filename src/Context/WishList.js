import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BaseUrl } from "../Componentes/BaseUrl/base";
import { mediaContext } from "./MediaStore";

export const FetchWishlistContext = createContext();

export default function FetchWishlistProvider(props) {
    const notify = (msg, type) => {
        toast[type](msg, {
            autoClose: 1000,
            theme: 'dark',
            position: 'bottom-center'
        });
    }

    const [wishlist, setWishlist] = useState({ result: [] });
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
    const { userData, LogOut } = useContext(mediaContext); // Add LogOut from context
    
    // Get token dynamically instead of storing it
    const getToken = () => localStorage.getItem('token');

    const handleAuthError = (error) => {
        if (error.response?.status === 401) {
            notify('Session expired. Please login again.', 'error');
            // Clear local storage and redirect to login
            localStorage.removeItem('token');
            if (LogOut) LogOut();
            return true;
        }
        return false;
    };

    const getProductWishlist = async () => {
        const token = getToken();
        if (!token) {
            console.log("No token available");
            return;
        }

        try {
            const { data } = await axios.get(`${BaseUrl}/wishlist/getAllWishlist`, {
                headers: { 'token': token }
            });
            
            console.log("Wishlist API Response:", data); // Debug log
            
            if (data && data.result && Array.isArray(data.result)) {
                setWishlist(data);
                setNumOfWishlistItems(data.result.length);
            } else if (data && Array.isArray(data)) {
                setWishlist({ result: data });
                setNumOfWishlistItems(data.length);
            } else {
                setWishlist({ result: [] });
                setNumOfWishlistItems(0);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error.response || error);
            
            if (!handleAuthError(error)) {
                // Only show error toast if it's not an auth error
                if (error.response?.data?.msg) {
                    notify(error.response.data.msg, 'error');
                }
            }
            
            setWishlist({ result: [] });
            setNumOfWishlistItems(0);
        }
    };

    useEffect(() => {
        if (getToken() && userData && userData !== '') {
            getProductWishlist();
        }
    }, [userData]);

    const addProductToWishlist = async (productId) => {
        const token = getToken();
        if (!token) {
            notify('Please login to add items to wishlist', 'error');
            return;
        }

        try {
            console.log(`Adding product to wishlist: ${productId}`);
            const response = await axios.patch(`${BaseUrl}/wishlist/addToWishlist`, 
                { productId }, 
                { headers: { 'token': token } }
            );
            
            console.log('Response from adding to wishlist:', response.data);
            notify('Product Added To Wishlist', 'success');
            
            // Update local state immediately for better UX
            if (response.data.result) {
                setWishlist({ result: response.data.result });
                setNumOfWishlistItems(response.data.result.length);
            } else {
                getProductWishlist(); // Fallback to fetching
            }
        } catch (error) {
            console.error("Error adding product to wishlist:", error.response || error);
            
            if (!handleAuthError(error)) {
                const errorMsg = error.response?.data?.msg || 'Error adding product to wishlist';
                notify(errorMsg, 'error');
            }
        }
    };

    const deleteProductFromWishlist = async (productId) => {
        const token = getToken();
        if (!token) {
            notify('Please login to remove items from wishlist', 'error');
            return;
        }

        try {
            const response = await axios.delete(`${BaseUrl}/wishlist/removeFromWishlist`, {
                data: { productId },
                headers: { 'token': token }
            });
            
            notify('Product Deleted From Wishlist', 'success');
            
            // Update local state immediately
            if (response.data.result) {
                setWishlist({ result: response.data.result });
                setNumOfWishlistItems(response.data.result.length);
            } else {
                getProductWishlist(); // Fallback to fetching
            }
        } catch (error) {
            console.error("Error deleting product from wishlist:", error.response || error);
            
            if (!handleAuthError(error)) {
                const errorMsg = error.response?.data?.msg || 'Error deleting product from wishlist';
                notify(errorMsg, 'error');
            }
        }
    };

    const clearWishlist = async () => {
        const token = getToken();
        if (!token) {
            notify('Please login to clear wishlist', 'error');
            return;
        }

        try {
            await axios.delete(`${BaseUrl}/wishlist/clearWishlist`, {
                headers: { 'token': token }
            });
            
            setWishlist({ result: [] });
            setNumOfWishlistItems(0);
            notify('Wishlist cleared', 'success');
        } catch (error) {
            console.error("Error clearing wishlist:", error.response || error);
            
            if (!handleAuthError(error)) {
                const errorMsg = error.response?.data?.msg || 'Error clearing wishlist';
                notify(errorMsg, 'error');
            }
        }
    };

    return (
        <FetchWishlistContext.Provider value={{
            addProductToWishlist,
            wishlist,
            numOfWishlistItems,
            deleteProductFromWishlist,
            clearWishlist,
            getProductWishlist
        }}>
            {props.children}
        </FetchWishlistContext.Provider>
    );
}