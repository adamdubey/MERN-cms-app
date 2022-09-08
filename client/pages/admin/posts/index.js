import { PostContext } from '../../../context/post';
import { useEffect, useState, useContext } from 'react';
import { Button, Col, List, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdminLayout from '../../../components/layout/AdminLayout';
import Link from 'next/link';
import axios from 'axios';

function Post() {
  // context
  const [posts, setPosts] = useContext(PostContext);

  const { posts } = post;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts');
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {};

  const handleDelete = async (post) => {};

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Button type="primary">
            <Link href="/admin/posts/new">
              <a>
                <PlusOutlined />
                Add New
              </a>
            </Link>
          </Button>
          <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>
          <List
            itemLayout="horizontal"
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>
                ]}
              >
                <List.Item.Meta title={item.title} />
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Post;
