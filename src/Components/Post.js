import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CommentSection from './CommentSection';

function Post({ post, setPosts }) {
  const [liked, setLiked] = useState(post.liked || false);

  const handleLike = () => {
    // Toggle the like state locally
    setPosts((prev) =>
      prev.map((p) =>
        p._id === post._id
          ? {
              ...p,
              likes: liked ? p.likes - 1 : p.likes + 1, // Adjust likes count
              liked: !liked, // Toggle liked status
            }
          : p
      )
    );
    setLiked(!liked); // Toggle the local like state
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="profile-pic"></div>
        <p><strong>{post.content}</strong></p>
      </div>
      <div className="post-actions">
        <FontAwesomeIcon
          icon={faHeart}
          className={`heart-icon ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        />{' '}
        ({post.likes})
      </div>

      <CommentSection comments={post.comments} postId={post._id} setPosts={setPosts} />
    </div>
  );
}

export default Post;
