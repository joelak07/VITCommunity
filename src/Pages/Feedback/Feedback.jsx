import React, { useState,useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
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
  console.log(check)
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

  useEffect(() => {
    // Initialize Firebase (make sure you have already initialized it in your app)
    // For example, import firebaseConfig from './firebaseConfig';
    // firebase.initializeApp(firebaseConfig);

    // Reference to the "users" collection


    // Function to count documents and log the result
    const countDocuments = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const count = snapshot.size;
        console.log('Number of documents in "users" collection:', count);
      } catch (error) {
        console.error('Error counting documents:', error);
      }
    };

    // Call the function to count documents when the component mounts
    countDocuments();
  }, []);

  const handleTextareaChange = (event) => {
    setFeedbackContent(event.target.value);
  };

  return (
    <div className="feedback">
      <div className="aboutus">
        <h2 className="titdev">Meet the Developers</h2>
        <div className="card1">
          <img src={myImage} alt="" />
          <div className="card1txt">
            <h2>Lead Developer</h2>
            <h3>Joel Abraham Koshy</h3>
            <h3>21BCE1350</h3>
          </div>
        </div>
        <div className="card1">
          <img src={fahe} alt="" />
          <div className="card1txt">
            <h3>Faheema Kattakath Sanil</h3>
            <h3>21BCE5518</h3>
          </div>
        </div>
        <h2 className="titdev">Advicers</h2>
        <div className="boxdev">
        <div className="card2">
          <img src={jithu} alt="" />
          <div className="card2txt">
            <h3>Jithu Joji</h3>
            <h3>21BCE1451</h3>
          </div>
        </div>
        <div className="card2">
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
