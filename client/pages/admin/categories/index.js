import { useState } from "react";
import { Layout } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Form, Input, Col, Row, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { toast } from "react-hot-toast";

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function Categories() {
    // state
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        console.log(values);
        try {
            setLoading(true);
            const { data }  = await axios.post("/category", values);
            toast.success("Category successfully created!");
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Category creation failed - Please try again!");
            setLoading(false);
        }
    }

  return (
    <AdminLayout>
        <Row>
            <Col span={12}>
                <h1>Categories</h1>
                <p>Add new category</p>
                <Form onFinish={onFinish}>
                    <Form.Item name="name">
                        <Input prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Category Name" />
                    </Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col>
                <p>Categories List</p>
            </Col>
        </Row>
    </AdminLayout>
  );
}

export default Categories;
