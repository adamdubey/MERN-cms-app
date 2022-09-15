import { Col, Layout, Row } from 'antd';
import AuthorLayout from '../../../components/layout/AuthorLayout';
import MediaLibrary from '../../../components/media/MediaLibrary';

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function AuthorMediaLibrary() {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary page="author" />
        </Col>
      </Row>
    </AuthorLayout>
  );
}

export default AuthorMediaLibrary;
