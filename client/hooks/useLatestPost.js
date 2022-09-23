import { useEffect, useState } from 'react';
import axios from 'axios';

const useLatestPost = () => {
  // state
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get('/posts/1');

        setLatestPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return {
    latestPosts
  };
};

export default useLatestPost;
