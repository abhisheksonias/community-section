import React, { useState } from 'react';
import PostList from './Components/PostList';
import './App.css';

function App() {
  const [posts, setPosts] = useState([
    { _id: '1', content: 'This is the first post!', likes: 10, liked: false, comments: [] },
    { _id: '2', content: 'Here is another interesting post!', likes: 5, liked: false, comments: [] },
  ]);

  const [newPostContent, setNewPostContent] = useState(''); // State for tracking new post content

  // Function to add a new post
  const postStory = () => {
    if (newPostContent.trim() !== '') {
      const newPost = {
        _id: Date.now().toString(),  // Generate a unique ID for the new post
        content: newPostContent,
        likes: 0,
        liked: false,
        comments: [],
      };

      setPosts([newPost, ...posts]);  // Add the new post to the beginning of the list
      setNewPostContent('');  // Clear the input field after posting
    }
  };

  return (
    <div className="app">
      <h1>Community Stories</h1>
      <div className="post-form">
        {/* Controlled textarea to capture new post content */}
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={postStory}>Post Story</button>
      </div>
      
      {/* Pass posts and setPosts as props to PostList */}
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
