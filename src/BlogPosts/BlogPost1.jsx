import React, { useState } from 'react';
import postsData from './PostData.json';
import { v4 as uuidv4 } from 'uuid';

const BlogPosts = () => {
  const [posts, setPosts] = useState(postsData);
  const [newPostText, setNewPostText] = useState('');

  // Handler for textarea change
  const handleTextChange = (e) => {
    setNewPostText(e.target.value);
  };

  // Handler for adding a new post
  const handleAddPost = () => {
    if (newPostText.trim()) {
      const newPost = {
        id: uuidv4(),
        author: 'You', // Placeholder for author
        text: newPostText,
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
    }
  };

  return (
    <div>
      <h1>Blog posts</h1>
      <h2>Create posts</h2>
      
      {/* Input area for new post */}
      <textarea
        placeholder="Message"
        value={newPostText}
        onChange={handleTextChange}
      />
      <button className="btn btn-primary" onClick={handleAddPost}>Post blog</button>

      {/* Map through posts and render them */}
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{post.author}</h3>
            <p>{post.text}</p>
            <p>Likes: 0</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
