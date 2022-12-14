import { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

function ContactForm() {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/contact', values);
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success('Your message has been sent!');
        form.resetFields();
        setLoading(false);
      }
    } catch (err) {
      console.log('err => ', err);
      setLoading(false);
      toast.error('Contact Form Email failed. Please try again later.');
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: '100px' }}>Contact</h1>

        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your Email Address' }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Your Email Address"
            />
          </Form.Item>

          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Write your message here..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ContactForm;
