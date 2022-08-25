import { Button, Form, Input, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const categoryUpdateModal = ({
  visible,
  setVisible,
  handleUpdate,
  updatingCategory
}) => {
  return (
    <Modal
      title="Update Category"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={handleUpdate}
        fields={[{ name: ['name'], value: updatingCategory.name }]}
      >
        <Form.Item name="name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Category Name"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default categoryUpdateModal;
