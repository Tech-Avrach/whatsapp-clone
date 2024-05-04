import React, { useEffect } from 'react'
import "./Login.css";
import { Button } from '@mui/material';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData } from './redux/userDataSlice';

function Login() {
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDataFromLocalStorage()
    },[])


    const getUserDataFromLocalStorage = () =>{
        const userDataFromLocalStorage = localStorage.getItem('userData');

        if (userDataFromLocalStorage) {
            // Parse the JSON string to convert it back to an object
            const userData = JSON.parse(userDataFromLocalStorage);
        
            // Now userData contains the user data retrieved from local storage
            // You can use it as needed, such as setting it in the Redux store
            dispatch(addUserData(userData));
        } else {
            // Handle the case when user data doesn't exist in local storage
            console.log('User data not found in local storage');
        }
    }
    // Corrected selector to get user data from the Redux store
    const userData = useSelector((state) => state.userData);


    const signIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;

                 // Dispatch action to add user data to Redux store
                dispatch(addUserData({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }));
    
                // Save user data to local storage
                localStorage.setItem('userData', JSON.stringify({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }));
            })
            .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/> 
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
            </div>
        </div>
    )
}

export default Login;
