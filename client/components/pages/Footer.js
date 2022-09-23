import ParallaxImage from './ParallaxImage';
import { Row, Col } from 'antd';
import {
  UsergroupAddOutlined,
  ApiOutlined,
  CopyrightOutlined
} from '@ant-design/icons';

const Footer = () => (
  <div>
    <ParallaxImage url="/images/footer.jpeg">
      <Row>
        <Col span={8} style={{ textAlign: 'center' }}>
          <UsergroupAddOutlined style={{ fontSize: 80 }} />
          <br />
          The ultimate MERN CMS blogging platform
        </Col>

        <Col span={8} style={{ textAlign: 'center' }}>
          <ApiOutlined style={{ fontSize: 80 }} />
          <br />
          Built with MERN
        </Col>

        <Col span={8} style={{ textAlign: 'center' }}>
          <CopyrightOutlined style={{ fontSize: 80 }} />
          <br />
          Copyright {new Date().getFullYear()} &copy; All rights reserved.
        </Col>
      </Row>
      <br />
    </ParallaxImage>
  </div>
);

export default Footer;
