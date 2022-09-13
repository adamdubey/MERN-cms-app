import { Col, Layout, Row } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import MediaLibrary from '../../../components/media/MediaLibrary';

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function AdminMediaLibrary() {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default AdminMediaLibrary;
