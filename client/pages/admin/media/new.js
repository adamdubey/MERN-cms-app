import { Col, Layout, Row } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import UploadFile from '../../../components/media/UploadFile';

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function NewMedia() {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <div style={{ padding: 100, textAlign: 'center' }}>
            <UploadFile rediredToLibrary={true} />
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewMedia;
