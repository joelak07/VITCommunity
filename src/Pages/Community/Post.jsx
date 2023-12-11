import React from 'react'

import './post.css'
const Post = () => {
  return (
    <div className='post'>
        <div className="namepost">
            <h3>Username</h3>
            <div className="datetime">
                <p>Time</p>
                <p>Date</p>
            </div>
        </div>
        <div className="postcont">
            <p>Post</p>
        </div>
        <div className="likes">
            <button>Like</button>
            <p>313</p>
        </div>
    </div>
  )
}

export default Post