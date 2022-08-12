import { Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

function Signup() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: '100px' }}>Signup Page</h1>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email address!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Sign Up
              </Button>
            )}
            <br />
            or{' '}
            <Link href="/signin">
              <a>Log In</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;
