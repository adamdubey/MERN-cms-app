import { useState, useEffect, useContext } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Avatar, Button, Checkbox, Col, Input, Select, Row } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../context/auth';
import { MediaContext } from '../../../context/media';
import Media from '../../../components/media';

useEffect(() => {
  const currentUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.id}`);

      setId(data._id);
      setName(data.name);
      setEmail(data.email);
      setWebsite(data.website);
      setRole(data.role);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };
  if (auth?.token) currentUser();
}, [auth]);

const UpdateUser = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);

  // state
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});

  // hooks
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-user-by-admin`, {
        id,
        name,
        email,
        password,
        website,
        role,
        image: media?.selected?._id
          ? media?.selected?._id
          : image?._id
          ? image?._id
          : undefined
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        let fromLocalStorage = JSON.parse(localStorage.getItem('auth'));
        fromLocalStorage.user = data;
        localStorage.setItem('auth', JSON.stringify(fromLocalStorage));
        toast.success('User updated successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('User update failed. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6}>
          <h4 style={{ marginBottom: '-10px' }}>Edit user</h4>
          <br />
          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            {media.selected ? (
              <>
                <div style={{ marginBottom: 15 }}></div>
                <Avatar src={media.selected.url} size={100} />
              </>
            ) : image ? (
              <>
                <div style={{ marginBottom: 15 }}></div>
                <Avatar src={image.url} size={100} />
              </>
            ) : (
              ''
            )}
          </div>
          <br />
          <Media />
          <br />
          <Input
            style={{ margin: '20px 0px 10px 0px' }}
            size="large"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <Input.Password
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Select
            value={role}
            style={{ margin: '10px 0px 10px 0px', width: '100%' }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="Author">Author</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>

          <Button
            onClick={handleSubmit}
            type="default"
            style={{ margin: '10px 0px 10px 0px' }}
            loading={loading}
            block
          >
            Submit
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default UpdateUser;
