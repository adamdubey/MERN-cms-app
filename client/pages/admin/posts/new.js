import { useContext, useState } from "react";
import { Col, Layout, Row } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../../context/theme";

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function NewPost() {
  // context
  const [theme, setTheme] = useContext(ThemeContext);

  // state
  const [content, setContent] = useState("");

  return (
    <AdminLayout>
      <Row>
        <Col span={14} offset={1}>
          <h1>Create New Post</h1>
          <Editor dark={theme === 'light' ? false : true} onChange={(v) => setContent(v())} />
        </Col>
        <Col span={6} offset={1}>
          Sidebar
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewPost;
