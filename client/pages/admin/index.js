import { Layout } from 'antd';
import AdminLayout from '../../components/layout/AdminLayout';

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function Admin() {
  return (
    <AdminLayout>
      <h1>Admin Page</h1>
    </AdminLayout>
    );
}

export default Admin;
