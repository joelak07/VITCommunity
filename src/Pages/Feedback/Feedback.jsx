import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./feedback.css";
import myImage from "../../Assets/IMG_7739-fotor-20231218232258.png";
import fahe from "../../Assets/p2-fotor-20231219213133.png";
import jithu from "../../Assets/image-fotor-20231219225846.png";
import jeevan from "../../Assets/main-thumb-1549876984-200-vxctvccbbcljsqboydzrgqcfhgwuxibn-fotor-20231220102455.png";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [feedbackContent, setFeedbackContent] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const check=localStorage.getItem('userName');
  if(check===null){
    navigate('/login');
  }

  const handleSendClick = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(collection(db, "feedback")), {
        student: auth.currentUser.displayName,
        content: feedbackContent,
        time: new Date().toLocaleString("en-US", { hour12: true }),
      });
      setFeedbackContent("");
      alert("Thanks for sharing your feedback 😊");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handlejithu = () => {
    navigate('/profileview', { state: { regno: "21BCE1451" } });
  };

  const handlejeevan = () => {
    navigate('/profileview', { state: { regno: "21BCE5436" } });
  };

  const handlejoel = () => {
    navigate('/profileview', { state: { regno: "21BCE1350" } });
  };

  const handlefahe = () => {
    navigate('/profileview', { state: { regno: "21BCE5518" } });
  };
  

  const handleTextareaChange = (event) => {
    setFeedbackContent(event.target.value);
  };

  return (
    <div className="feedback">
      <div className="aboutus">
        <h2 className="titdev">Meet the Developers</h2>
        <div className="card1" onClick={handlejoel}>
          <img src={myImage} alt="" />
          <div className="card1txt">
            <h2>Lead Developer</h2>
            <h3>Joel Abraham Koshy</h3>
            <h3>21BCE1350</h3>
          </div>
        </div>
        <div className="card1" onClick={handlefahe}>
          <img src={fahe} alt="" />
          <div className="card1txt">
            <h3>Faheema Kattakath Sanil</h3>
            <h3>21BCE5518</h3>
          </div>
        </div>
        <h2 className="titdev">Advisors</h2>
        <div className="boxdev">
        <div className="card2" onClick={handlejithu}>
          <img src={jithu} alt="" />
          <div className="card2txt">
            <h3>Jithu Joji</h3>
            <h3>21BCE1451</h3>
          </div>
        </div>
        <div className="card2" onClick={handlejeevan}>
          <img src={jeevan} alt="" />
          <div className="card2txt">
            <h3>Jeevan Alexen Kavalam</h3>
            <h3>21BCE5436</h3>
          </div>
        </div>
        </div>
      </div>
      <div className="feedbackcont">
        <h1>Share your Feedback😊</h1>
        <div className="writepost">
          <textarea
            name="feedbackTextarea"
            id="feedbackTextarea"
            cols="20"
            rows="7"
            value={feedbackContent}
            onChange={handleTextareaChange}
            required
            placeholder="Enter your feedback here"
          ></textarea>
        </div>
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};

export default Feedback;
