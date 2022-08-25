import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Form, Input, Col, Row, Button, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CategoryUpdateModal from '../../../components/modal/CategoryUpdateModal';

const { Content, Sider } = Layout; // eslint-disable-line no-unused-vars

function Categories() {
  // state
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // update state
  const [updatingCategory, setUpdatingCategory] = useState([]);
  const [visible, setVisible] = useState(false);

  // hooks
  const [form] = Form.useForm();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data } = await axios.post('/category', values);
      setCategories([data, ...categories]);
      toast.success('Category successfully created!');
      setLoading(false);
      form.resetFields(['name']);
    } catch (error) {
      console.log(error);
      toast.error('Category creation failed - Please try again!');
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      setCategories(categories.filter((cat) => cat._id !== data._id));
      toast.success('Category deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Category delete failed');
    }
  };

  const handleEdit = async (item) => {
    try {
      setUpdatingCategory(item);
      setVisible(true);
      const { data } = await axios.put(`/category/${item.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(`/category/${item.slug}`, values);

      const newCategories = categories.map((cat) => {
        if (cat._id === data._id) {
          return data;
        }
        return cat;
      });

      setCategories(newCategories);
      toast.success('Category updated successfully!');
      setVisible(false);
      setUpdatingCategory({});
    } catch (err) {
      console.log(err);
      toast.error('Category update failed');
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={12}>
          <h1>Categories</h1>
          <p>Add new category</p>
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Category Name"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          ></List>
        </Col>
        <CategoryUpdateModal
          visible={visible}
          setVisible={setVisible}
          handleUpdate={handleUpdate}
          updatingCategory={updatingCategory}
        />
      </Row>
    </AdminLayout>
  );
}

export default Categories;
