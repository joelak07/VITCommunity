import React from 'react'
import { doc, updateDoc, increment } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

import './post.css'
const Post = ({ student, content, likes, time, postId,dislikes }) => {
    const [like, setLike] = useState(likes);
    const [dislike, setDislike] = useState(dislikes);   
    const [fire, setFire] = useState(0);
    console.log(likes);
    console.log("postId" + postId); 
    
    const handlelike = () => {
        const docRef = doc(db, "posts", postId);
        updateDoc(docRef, {
            likes: increment(1)
        });
        setLike(like + 1);
    }

    const handledislike = () => {
        const docRef = doc(db, "posts", postId);
        updateDoc(docRef, {
            dislikes: increment(1)
        });
        setDislike(dislike + 1);
    }

    const handleFire = () => {
        const docRef = doc(db, "posts", postId);
        updateDoc(docRef, {
            fire: increment(1)
        });
        setFire(fire + 1);
    }

    return (
        <div className='post'>
            <div className="namepost">
                <h3>{student}</h3>
                <div className="datetime">
                    <p>{time}</p>
                </div>
            </div>
            <div className="postcont">
                <p>{content}</p>
            </div>
            <div className="likes">
                <button onClick={handlelike}>❤️</button><p>{like}</p>
                <button onClick={handledislike}>👎</button><p>{dislike}</p>
                <button onClick={handleFire}>🔥</button><p>{fire}</p>   
            </div>
        </div>
    )
}

export default Post