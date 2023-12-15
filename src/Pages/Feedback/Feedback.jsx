import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './feedback.css';

const Feedback = () => {
  const [feedbackContent, setFeedbackContent] = useState('');
  const auth=getAuth();
  const handleSendClick = async(event) => {
    event.preventDefault();
    try {
        await setDoc(doc(collection(db, 'feedback')), {
          student: auth.currentUser.displayName,
          content: feedbackContent,
          time: new Date().toLocaleString('en-US', { hour12: true }),
        });
        setFeedbackContent('');
        alert('Thanks for sharing your feedback 😊');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
  };

  const handleTextareaChange = (event) => {
    setFeedbackContent(event.target.value);
  };

  return (
    <div className='feedback'>
      <div className="feedbackcont">
        <h1>Share your Feedback😊</h1>
        <div className="writepost">
          <textarea
            name="feedbackTextarea"
            id="feedbackTextarea"
            cols="20"
            rows="10"
            value={feedbackContent}
            onChange={handleTextareaChange}
            required
            placeholder='Enter your feedback here'
          ></textarea>
          </div>
          <button onClick={handleSendClick}>Send</button>
        
      </div>
    </div>
  );
};

export default Feedback;
