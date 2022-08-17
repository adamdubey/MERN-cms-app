import { useState, useContext } from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';

function Signup() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // hook
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/signup`, values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save context
        setAuth(data);

        // save localStorage
        localStorage.setItem('auth', JSON.stringify(data));
        toast.success('Successfully signed up!');
        setLoading(false);

        // redirect user
        router.push('/admin');
      }
    } catch (err) {
      toast.error('Signup Failed! Please try again');
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: '100px' }}>Signup</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item name="email" rules={[{ type: 'email' }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Register
            </Button>
            <br />
            Or{' '}
            <Link href="/signin">
              <a>Login now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;
