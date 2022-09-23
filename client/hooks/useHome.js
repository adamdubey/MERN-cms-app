import { useContext, useState, useEffect } from 'react';
import { Row, Col, Input, Button, Image, Divider } from 'antd';
import AdminLayout from '../../components/layout/AdminLayout';
import Media from '../../components/media';
import { MediaContext } from '../../context/media';
import axios from 'axios';
import toast from 'react-hot-toast';

const useHome = () => {
  // state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fullWidthImage, setFullWidthImage] = useState('');

  useEffect(() => {
    loadHomePage();
  }, []);

  const loadHomePage = async () => {
    try {
      const { data } = await axios.get('/page/home');

      setTitle(data.title);
      setSubtitle(data.subtitle);
      setFullWidthImage(data.fullWidthImage);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    title,
    subtitle,
    fullWidthImage,
    setTitle,
    setSubtitle,
    setFullWidthImage
  };
};

export default useHome;
