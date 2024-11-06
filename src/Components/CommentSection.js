import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function CommentSection({ comments, postId, setPosts }) {
  const [commentText, setCommentText] = useState('');
  
  // Handle adding a comment locally
  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        _id: Date.now().toString(),  // Simulating a unique ID for the comment
        text: commentText,
        likes: 0,
        liked: false,
      };

      // Update the posts state to add the new comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setCommentText('');  // Clear the comment input field
    }
  };

  // Handle liking a comment locally
  const handleCommentLike = (commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                      liked: !comment.liked,
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  return (
    <div className="comment-section">
      <div className="comment-form">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post</button>
      </div>

      <div className="comments">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <div className="comment-actions">
              <FontAwesomeIcon
                icon={faHeart}
                className={`heart-icon ${comment.liked ? 'liked' : ''}`}
                onClick={() => handleCommentLike(comment._id)}
              />{' '}
              ({comment.likes})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
