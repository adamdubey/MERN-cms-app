import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

const FullWidthImage = () => (
  <>
    <img
      src="/images/default-full.jpeg"
      alt="MERN CMS App"
      style={{
        width: '100%',
        height: '500px',
        overFlow: 'hidden',
        objectFit: 'cover'
      }}
    />

    <div
      style={{
        textAlign: 'center',
        marginTop: '-420px',
        fontSize: '75px',
        textShadow: '2px 2px 4px #000000'
      }}
    >
      <h1>MERN CMS</h1>
      <p style={{ fontSize: '18px', marginTop: '-100px' }}>
        Full Stack Content Management System
      </p>
      <Link href={'/subscriber'}>
        <a>
          <Button type="primary" size="large" icon={<SendOutlined />}>
            Explore
          </Button>
        </a>
      </Link>
    </div>
  </>
);

export default FullWidthImage;
