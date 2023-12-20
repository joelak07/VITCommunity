import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import GoogleButton from 'react-google-button';
import { auth, provider, db } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const nav = document.getElementById('respNav');
        if (nav.classList.contains('responsive')) {
            nav.classList.remove('responsive');
        }
    }, []);

    const loggingin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            // if (result.user.email.split('@')[1] !== 'vitstudent.ac.in') {
            //     alert('Login with your VIT email ID!');
            // } else {
                // const regno = result.user.displayName.substring(result.user.displayName.length - 9);
                const regno="21BCE0000";
                const docRef = doc(db, "users", regno);
                const docSnap = await getDoc(docRef);
                const newLoginTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

                if (docSnap.exists()) {
                    // Store userName in localStorage
                    // localStorage.setItem('userName', result.user.displayName.substring(0, result.user.displayName.length - 10));
                    // localStorage.setItem('systemname', result.user.displayName);
                    localStorage.setItem('userName', "Johnson George 21BCE0000");
                    localStorage.setItem('systemname', "Johnson George");

                    updateDoc(docRef, {
                        logins: increment(1),
                        logintime: arrayUnion(newLoginTime),
                    });


                    navigate('/home', {
                        state: {
                            userToken: result.user.accessToken,
                            nametoken: result.user.displayName,
                        },
                    });
                } else {
                    localStorage.setItem('userName', result.user.displayName.substring(0, result.user.displayName.length - 10));
                    localStorage.setItem('systemname', result.user.displayName);
                    navigate('/signup', {
                        state: {
                            userToken: result.user.accessToken,
                            regno: regno,
                            userName: result.user.displayName,
                        },
                    });
                }
            // }


        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login">
            <div className="leftlog">
                <h1>Where Knowledge Meets Fun <br /> Share, Learn, Thrive!</h1>
            </div>
            <div className="rightlog">
                <div className="logincontainer">
                    <GoogleButton onClick={loggingin} style={{ fontSize: '16px', padding: '10px' }} />
                </div>
            </div>
        </div>
    );
};

export default Login;
