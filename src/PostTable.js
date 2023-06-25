import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=';

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
      setPage(prevPage => prevPage + 1);
    }, 10000); // Polling interval: 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}${page}`);
      const newPosts = response.data.hits;
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Created At</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.objectID}>
            <td>{post.title}</td>
            <td>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.url}
              </a>
            </td>
            <td>{post.created_at}</td>
            <td>{post.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostTable;
