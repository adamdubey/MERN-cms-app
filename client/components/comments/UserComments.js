import { PostContext } from '../../../context/post';
import { useEffect, useState, useContext } from 'react';
import { Button, Col, Input, List, Row, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import PostsList from '../../../components/posts/PostsList';
import { AuthContext } from '../../context/auth';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CommentForm from './CommentForm';

dayjs.extend(localizedFormat);

function UserComments() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // state
  const [keyword, setKeyword] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);

  // hooks
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
    }
  }, [auth?.token]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/user-comments/`);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const answer = window.confirm('Are you sure you want to delete?');
      if (!answer) return;

      const { data } = await axios.delete(`/comment/${comment._id}`);

      if (data?.ok) {
        setComments(comments.filter((c) => c._id !== comment._id));
        setTotal(total - 1);
        toast.success('Comment deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/comment/${selectedComment._id}`, {
        content
      });

      let arr = comments;
      const index = arr.findIndex((c) => c._id === selectedComment._id);
      arr[index].content = data.content;
      setComments(arr);

      setLoading(false);
      setVisible(false);
      setSelectedComment({});
      toast.success('Comment updated successfully');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <h1 style={{ marginTop: 15 }}>{comments?.length} Comments</h1>
          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
          <List
            itemLayout="horizontal"
            dataSource={filteredComments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
                    <a>view</a>
                  </Link>,
                  <a
                    onClick={() => {
                      setSelectedComment(item);
                      setVisible(true);
                      setContent(item.content);
                    }}
                  >
                    edit
                  </a>,
                  <a onClick={() => handleDelete(item)}>delete</a>
                ]}
              >
                <List.Item.Meta
                  description={`On ${item?.postId?.title} | ${
                    item?.postedBy?.name
                  } | ${dayjs(item.createdAt).format('L LT')}`}
                  title={item.content}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Modal
            visible={visible}
            title="Update Comment"
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <CommentForm
              handleSubmit={handleSubmit}
              comment={content}
              setComment={setContent}
              loading={loading}
            />
          </Modal>
        </Col>
      </Row>
    </>
  );
}

export default UserComments;
