import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import GoogleButton from 'react-google-button';
import { auth, provider, db } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, updateDoc, increment} from "firebase/firestore";
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const isMobile = window.innerWidth < 1100;

    useEffect(() => {
        if (isMobile) {
            alert('This web app is best viewed on a PC. Please open it on a computer.');
        }
    }, [isMobile]);

    const loggingin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            if (!isMobile) {
                if (result.user.email.split('@')[1] !== 'vitstudent.ac.in') {
                    alert('Login with your VIT email ID!');
                } else {
                    const regno = result.user.displayName.substring(result.user.displayName.length - 9);
                    const docRef = doc(db, "users", regno);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // Store userName in localStorage
                        localStorage.setItem('userName', result.user.displayName.substring(0, result.user.displayName.length - 10));
                        localStorage.setItem('systemname', result.user.displayName);
                        console.log('Logged in!');

                        updateDoc(docRef, {
                            logins: increment(1)
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
                        console.log('User does not exist in database');
                        navigate('/signup', {
                            state: {
                                userToken: result.user.accessToken,
                                regno: regno,
                                userName: result.user.displayName,
                            },
                        });
                    }
                }
            }
            else{
                alert("Open in a Desktop or Laptop to log in!");
            }
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
