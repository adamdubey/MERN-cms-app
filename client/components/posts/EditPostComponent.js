import { useContext, useEffect, useState } from 'react';
import { Button, Col, Image, Input, Layout, Row, Select, Modal } from 'antd';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from '../../context/theme';
import axios from 'axios';
import { uploadImage } from '../../functions/upload';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import Media from '../../components/media';
import { MediaContext } from '../media';
import { loadComponents } from 'next/dist/server/load-components';

const { Option } = Select;

function EditPost({ page = 'admin' }) {
  // context
  const [theme, setTheme] = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);

  // state
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [featuredImage, setFeaturedImage] = useState({});
  const [postId, setPostId] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // hook
  const router = useRouter();

  useEffect(() => {
    loadPost();
  }, [router?.query?.slug]);

  const loadPost = async () => {
    try {
      const { data } = await axios.get(`/post/${router.query.slug}`);
      setTitle(data.post.title);
      setContent(data.post.content);
      setFeaturedImage(data.post.featuredImage);
      setPostId(data._id);

      // push category names
      let arr = [];
      data.post.categories.map((c) => arr.push(c.name));
      setCategories(arr);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/edit-post/${postId}`, {
        title,
        content,
        categories,
        featuredImage: media?.selected._id
          ? media?.selected?._id
          : featuredImage?._id
          ? featuredImage._id
          : undefined
      });

      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success('Post updated successfully!');
        setMedia({ ...media, selected: null });
        router.push(`/${page}/posts`);
      }
    } catch (err) {
      console.log(err);
      toast.error('Post create failed. Please try again');
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={14} offset={1}>
        <h1>Edit Post</h1>
        <Input
          size="large"
          placeholder="Give your post a title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem('post-title', JSON.stringify(e.target.value));
          }}
        />
        <br />
        <br />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="editor-scroll">
            <Editor
              defaultValue={content}
              dark={theme === 'light' ? false : true}
              onChange={(v) => {
                setContent(v());
                localStorage.setItem('post-content', JSON.stringify(v()));
              }}
              uploadImage={uploadImage}
            />
          </div>
        )}
        <br />
        <br />
      </Col>
      <Col span={6} offset={1}>
        <Button
          style={{ margin: '10px 0px 10px 0px', width: '100%' }}
          onClick={() => setVisible(true)}
        >
          Preview
        </Button>
        <Button
          style={{ margin: '10px 0px 10px 0px', width: '100%' }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}
        >
          <UploadOutlined /> Featured Image
        </Button>
        <h4>Categories</h4>
        <Select
          mode="multiple"
          allowClear={true}
          placeholder="Select Categories"
          style={{ width: '100%' }}
          onChange={(v) => setCategories(v)}
          value={[...categories]}
        >
          {loadedCategories.map((item) => (
            <Option key={item.name}>{item.name}</Option>
          ))}
        </Select>

        {media?.selected ? (
          <div style={{ marginTop: '15px' }}>
            <Image width="100%" src={media?.selected?.url} />
          </div>
        ) : featuredImage?.url ? (
          <div style={{ marginTop: '15px' }}>
            <Image width="100%" src={featuredImage?.url} />
          </div>
        ) : (
          ''
        )}
        <Button
          loading={loading}
          style={{ margin: '10px 0px 10px 0px', width: '100%' }}
          type="primary"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </Col>
      <Modal
        title="Preview Post"
        centered
        visible={media.showMediaModal}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={720}
      >
        <h1>{title}</h1>
        <Editor
          defaultValue={content}
          dark={theme === 'light' ? false : true}
          readOnly={true}
        />
      </Modal>
      <Modal
        visible={visibleMediaModal}
        title="Media"
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
        width={720}
        footer={null}
      >
        <Media />
      </Modal>
    </Row>
  );
}

export default EditPost;
