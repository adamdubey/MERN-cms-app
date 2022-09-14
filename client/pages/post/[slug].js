import { useContext } from 'react';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import dayjs from 'dayjs';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from '../../context/theme';

const { Meta } = Card;
const { Title } = Typography;

export const SinglePost = ({ post }) => {
  // context
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content.subtring(0, 160)} />
      </Head>
      <Row>
        <Col xs={24} xl={16}>
          <Card
            cover={
              <img src={post?.featuredImage?.url || ''} alt={post.title} />
            }
          >
            <Title>{post.title}</Title>
            <p>
              {dayjs(post.createdAt).format('MMMM D, YYYY h:mm A')} / 0 Comments
              / in{' '}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>
            <Editor
              dark={theme === 'light' ? false : true}
              readOnly={true}
              defaultValue={post.content}
            />
          </Card>
        </Col>

        <Col xs={22} xl={6} offset={1}>
          sidebar
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/posts/${params.slug}`
  );

  return {
    props: {
      post: data
    }
  };
}

export default SinglePost;
