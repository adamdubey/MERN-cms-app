import { useContext, useState, useEffect } from 'react';
import { Row, Col, Input, Button, Image, Divider } from 'antd';
import AdminLayout from '../../components/layout/AdminLayout';
import Media from '../../components/media';
import { MediaContext } from '../../context/media';
import axios from 'axios';
import toast from 'react-hot-toast';

const Customize = () => {
  // context
  const [media, setMedia] = useContext(MediaContext);

  // state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullWidthImage, setFullWidthImage] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/homepage', {
        title,
        subtitle,
        fullWidthImage: media?.selected?._id
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Customize Home Page</h1>
            <p>Set the full width image, title, and subtitle.</p>
          </Divider>
        </Col>

        <Col span={18}>
          <Media />

          <Input
            style={{ margin: '20px 0px 20px 0px' }}
            size="large"
            placeholder="Update Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            style={{ margin: '20px 0px 20px 0px' }}
            size="large"
            placeholder="Update Subtitle..."
            value={subtitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          <Button
            onClick={handleSave}
            type="default"
            style={{ margin: '10px 0px 10px 0px' }}
            loading={loading}
            block
          >
            Save
          </Button>
        </Col>

        <Col span={6}>
          <div style={{ margin: '40px 0px 0px 20px' }}>
            {media?.selected ? (
              <Image width="100%" src={media?.selected?.url} />
            ) : fullWidthImage ? (
              <Image width="100%" src={fullWidthImage.url} />
            ) : (
              ''
            )}
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Customize;
