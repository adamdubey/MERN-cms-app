import { Layout } from 'antd';
import Admin from '../../pages/admin';
import AdminNav from '../nav/AdminNav';

const { Content } = Layout;

function AdminLayout({ children }) {
  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
