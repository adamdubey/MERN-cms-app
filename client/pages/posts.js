import { Avatar, Card, Col, Row } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

const { Meta } = Card;

export const Posts = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web development and programming" />
      </Head>
      <Row gutter={12}>
        {posts.map((post) => (
          <Col xs={24} xl={8} style={{ marginTop: 5, marginBottom: 5 }}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <Card
                  hoverable
                  cover={
                    <Avatar
                      shape="square"
                      style={{ height: '200px' }}
                      src={
                        post.featuredImage?.url ||
                        'https://media.giphy.com/media/KmHueA88mFABT9GkkR/giphy.gif'
                      }
                      alt={post.title}
                    />
                  }
                >
                  <Meta title={post.title} />
                </Card>
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/posts`);

  return {
    props: {
      posts: data
    }
  };
}

export default Posts;
