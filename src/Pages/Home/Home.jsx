import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import './home.css';
import { getDoc, doc } from 'firebase/firestore';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import Point from '../Leaderboard/Point';
import Admin from './Admin';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [streak, SetStreak] = useState(0);
  const [topUsers, setTopUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [users, setUsers] = useState(0);

  const name = localStorage.getItem('userName');
  const regno = localStorage.getItem('regno');

  const [quote, setQuote] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1100) {
        alert("Home Page not available for mobile at the moment. Kindly use navbar to navigate to other pages. Sorry for the inconvenience.")
        navigate('/community');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);


  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        const { content } = response.data;
        setQuote(`${content}`);
      } catch (error) {
        console.error('Error fetching random quote:', error);
      }
    };

    fetchRandomQuote();
  }, []);

  useEffect(() => {
    const fetchAdminMessages = async () => {
      try {
        const q = query(collection(db, 'admin'), orderBy('time', 'desc'));
        const querySnapshot = await getDocs(q);
        const adminMessages = [];
        querySnapshot.forEach((doc) => {
          adminMessages.push({ id: doc.id, ...doc.data() });
        });

        setAdmin(adminMessages);
      } catch (error) {
        console.error('Error fetching admin messages:', error);
      }
    };

    fetchAdminMessages();
  }, []);

  console.log(admin);

  useEffect(() => {
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    }
    if (name === null) {
      navigate('/');
    }

  }, [name, navigate]);


  const goToPreviousQP = () => {
    navigate('/previousqp', { state: { name } });
  };

  const goToCommunity = () => {
    navigate('/community', { state: { name } });
  };

  const navlead = () => {
    navigate('/leaderboard');
  }

  const goToNotes = () => {
    navigate('/notes', { state: { name } });
  };

  const goToFeedback = () => {
    navigate('/feedback');
  };

  useEffect(() => {
    const fetchUserStreak = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', regno));
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
  });

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });

        setTopUsers(users);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', 'count'));
        if (userDoc.exists()) {
          setUsers(userDoc.data().users);
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="home-container">
      <div className="homecontent">
        <div className="tophead">
          <h1 className="heading">Home Page</h1>

          <h2 className="user-greeting">Hello {name}😊</h2>
        </div>
        <div className="mainhome">
          <div className="leftmainhome">
            <div className="leftmaintop">
              <div className="streakbox">
                <h3>Streak: {streak}🔥</h3>
              </div>
              <div className="usersbox">
                <h3>Total Users: {users}</h3>
              </div>
              <div className="quotebox">
                <p>{quote}</p>
              </div>
            </div>
            <div className="mainhomebot">
              <div className="comhome">
                <b>Have a look at what your friends have to say and feel free <br />to voice out your opinions</b>
                <button className="button" onClick={goToCommunity}>Go to Community</button>
              </div>
              <div className="comhome">
                <b>View and upload previous CAT,FAT Theory and lab papers here</b>
                <button className="button" onClick={goToPreviousQP}>Go to Previous QP</button>
              </div>
              <div className="comhome">
                <b>View and Upload study material and grow together</b>
                <button className="button" onClick={goToNotes}>Resources</button>
              </div>
              <div className="comhome">
                <b>Share your valuable Feedback here</b>
                <button className="button" onClick={goToFeedback}>Feedback</button>
              </div>
            </div>
          </div>

          <div className="home2">
            <div className="leadhome" onClick={navlead}>
              <h3>Leaderboard🏆</h3>
              <div className="leadhomelist">
                {topUsers.map((user, index) => (
                  <Point key={user.id} rank={index + 1} regno={user.id} name={user.name} score={user.points} screen="home" />
                ))}
              </div>
            </div>
            <div className="admin">
              <h3>Messages from Admin</h3>
              <div className="messlistad">
                {admin.map((messageData) => (
                  <Admin key={messageData.id} message={messageData.message} time={messageData.time} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
