import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let mediaContext = createContext(null);

export default function MediaContextProvider(props) {
    const [userData, setUserData] = useState(''); // Fixed state variable name for consistency

    // Function to decode the token and save user data
    let saveUserData = () => {
        let encodedToken = localStorage.getItem("token");
        if (encodedToken) {
            console.log(encodedToken); // Log the encoded token for debugging
            let decodedToken = jwtDecode(encodedToken);
            setUserData(decodedToken); // Save the decoded user data
        }
    };

    // Effect to run on component mount
    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveUserData(); // Decode and set user data if token exists
        }
    }, []); // Empty dependency array to run only once

    // Function to log out the user
    let LogOut = () => {
        localStorage.removeItem("token"); // Remove the token from local storage
        setUserData(''); // Reset user data

        return <Navigate to="/Login" />; // Redirect to login page
    };

    // Provide context values
    return (
        <mediaContext.Provider value={{ saveUserData, userData, LogOut }}>
            {props.children}
        </mediaContext.Provider>
    );
}
