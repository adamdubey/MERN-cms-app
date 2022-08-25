import { useContext, useEffect, useState } from 'react';
import { Col, Input, Layout, Row } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from '../../../context/theme';
import axios from 'axios';

const { Option } = Select;
const { Content, Sider } = Layout;

function NewPost() {
  // load from localStorage
  const savedTitle = () => {
    if(process.browser) {
      if(localStorage.getItem("post-title")) {
        return JSON.parse(localStorage.getItem("post-title"));
      }
    }
  }

  const savedContent = () => {
    if(process.browser) {
      if(localStorage.getItem("post-content")) {
        return JSON.parse(localStorage.getItem("post-content"));
      }
    }
  }

  // context
  const [theme, setTheme] = useContext(ThemeContext);

  // state
  const [content, setContent] = useState(savedContent());
  const [title, setTitle] = useState(savedTitle());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, [])
  
  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AdminLayout>
      <Row>
        <Col span={14} offset={1}>
          <h1>Create New Post</h1>
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
          <Editor
            defaultValue={content}
            dark={theme === 'light' ? false : true}
            onChange={(v) => {
              setContent(v());
              localStorage.setItem('post-content', JSON.stringify(v()));
            }}
            uploadImage={(file) => console.log(file)}
          />
          <br />
          <br />

        </Col>
        <Col span={6} offset={1}>
          <h4>Categories</h4>
          <Select 
            mode="multiple"
            allowClear={true}
            placeholder="Select Categories"
            style={{ width: '100%' }}
            onChange={(v) => setCategories(v)}
          >
            {loadedCategories.map((item) => (<Option key={item.name}>{item.name}</Option>)}
          </Select>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewPost;
