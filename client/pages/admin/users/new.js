import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, Checkbox, Col, Input, Select, Row } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import generator from 'generate-password';

const NewUser = () => {
  // state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState(generator.generate({ length: 8 }));
  const [role, setRole] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/create-user', {
        email,
        name,
        website,
        password,
        role,
        checked
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success('User created successfully');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error('Signup failed. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6}>
          <h4 style={{ marginBottom: '-10px' }}>Add new user</h4>
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
          <div style={{ display: 'flex' }}>
            <Button
              onClick={() => setPassword(generator.generate({ length: 8 }))}
              type="default"
              size="large"
              style={{ margin: '10px 0px 10px 0px' }}
            >
              Generate Password
            </Button>
            <Input.Password
              style={{ margin: '10px 0px 10px 0px' }}
              size="large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Select
            defaultValue="Subscriber"
            style={{ margin: '10px 0px 10px 0px', width: '100%' }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="Author">Author</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Send the new user an email about their account.
          </Checkbox>
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

export default NewUser;
