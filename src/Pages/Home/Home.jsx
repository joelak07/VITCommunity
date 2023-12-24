import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import './home.css';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [streak,SetStreak]=useState(0);
  const name = localStorage.getItem('userName');
  if (name === null) {
    navigate('/');
  }
  
  useEffect(() => {
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    }
    
  }, [name, navigate]);


  const goToPreviousQP = () => {
    navigate('/previousqp', { state: { name } });
  };

  const goToCommunity = () => {
    navigate('/community', { state: { name } });
  };

  const goToNotes = () => {
    navigate('/notes', { state: { name } });
  };

  const goToFeedback = () => {
    navigate('/feedback');
  };

  useEffect(() => {
    const fetchUserStreak = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.displayName.slice(-9)));
        if (userDoc.exists()) {
          SetStreak(userDoc.data().streak);
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user streak:', error);
      }
    };

    fetchUserStreak();
  }, [auth.currentUser.displayName]);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="tophome">
          <h1 className="heading">Home Page</h1>
          <h2 className="user-greeting">Hello {name}</h2>
          <h3>Streak: {streak}🔥</h3>
        </div>
        <div className="homecontent">
          <div className="homecontent1">
            <b>View and upload previous CAT,FAT Theory and lab papers here</b>
            <button className="button" onClick={goToPreviousQP}>Go to Previous QP</button>
          </div>
          <div className="homecontent2">
            <b>Have a look at what your friends have to say and feel free <br />to voice out your opinions</b>
            <button className="button" onClick={goToCommunity}>Go to Community</button>
          </div>
          <div className="homecontent3">
            <b>View and Upload study material and grow together</b>
            <button className="button" onClick={goToNotes}>Resources</button>
          </div>
          <div className="homecontent3">
            <b>Share your valuable Feedback here</b>
            <button className="button" onClick={goToFeedback}>Feedback</button>
          </div>
         
        </div>
      </div>

    </div>
  );
};

export default Home;
