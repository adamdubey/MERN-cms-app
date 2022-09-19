import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Button, Input } from 'antd';

const { TextArea } = Input;

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <br />
      <TextArea
        disabled={auth?.user === null && auth?.token === ''}
        value={commnt}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows="4"
        maxLength={500}
      />
      <Button
        style={{ marginTop: 4 }}
        type="primary"
        loading={loading}
        disabled={comment === ''}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default CommentForm;
