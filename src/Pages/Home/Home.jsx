import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('userName');
  useEffect(() => {
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

  const goToNotes = () => {
    navigate('/notes', { state: { name } });
  };

  return (
    <div className="home-container">
      {/* <h2 className="heading">Welcome to the Home Page!</h2>
      <h2 className="user-greeting">Hello {name}</h2>
      <div className="button-container">
        <button className="button" onClick={goToPreviousQP}>Go to Previous QP</button>
        <button className="button" onClick={goToCommunity}>Go to Community</button>
        <button className="button" onClick={goToNotes}>Resources</button>
      </div> */}
      <div className="home-content">
        <div className="tophome">
          <h1 className="heading">Home Page</h1>
          <h2 className="user-greeting">Hello {name}</h2>
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
        </div>
      </div>

    </div>
  );
};

export default Home;
