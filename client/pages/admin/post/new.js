import { Layout } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function NewPost() {
  return (
    <AdminLayout>
      <h1>Create New Post</h1>
    </AdminLayout>
  );
}

export default NewPost;
