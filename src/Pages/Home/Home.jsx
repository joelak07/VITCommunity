import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('userName');  
  useEffect(()=>{
    if(name===null){
      navigate('/');
    }
  },[name,navigate]);


  const goToPreviousQP = () => {
    navigate('/previousqp', { state: { name } });
  };

  const goToCommunity = () => {
    navigate('/community', { state: { name } });
  };

  const goToNotes = () => {
    navigate('/notes', { state: { name } });
  };

  return (
    <div className="home-container">
      <h2 className="heading">Welcome to the Home Page!</h2>
      <h2 className="user-greeting">Hello {name}</h2>
      <div className="button-container">
        <button className="button" onClick={goToPreviousQP}>Go to Previous QP</button>
        <button className="button" onClick={goToCommunity}>Go to Community</button>
        <button className="button" onClick={goToNotes}>Resources</button>
      </div>
    </div>
  );
};

export default Home;
