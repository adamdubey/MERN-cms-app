import { PostContext } from '../../../context/post';
import { useEffect, useState, useContext } from 'react';
import { Button, Col, List, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import AuthorLayout from '../../../components/layout/AuthorLayout';
import Link from 'next/link';
import axios from 'axios';
import PostsList from '../../../components/posts/PostsList';

function Post() {
  // context
  const [post, setPost] = useContext(PostContext);

  // hooks
  const router = useRouter();

  const { posts } = post;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts-by-author');
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    try {
      return router.push(`/author/posts/${post.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm('Are you sure you want to delete?');
      if (!answer) return;

      const { data } = await axios.delete(`/post/${post._id}`);

      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id)
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <Button type="primary">
            <Link href="/author/posts/new">
              <a>
                <PlusOutlined />
                Add New
              </a>
            </Link>
          </Button>
          <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>
          <PostsList
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </AuthorLayout>
  );
}

export default Post;
