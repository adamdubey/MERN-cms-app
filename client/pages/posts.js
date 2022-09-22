import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

const { Meta } = Card;

export const Posts = ({ posts }) => {
  // state
  const [allPosts, setAllPosts] = useState(posts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/post-count');
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${page}`);
      setAllPosts([...allPosts, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web development and programming" />
      </Head>
      <Row gutter={12}>
        {allPosts.map((post) => (
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
      {allPosts?.length < total && (
        <Row>
          <Col span={12} style={{ textAlign: 'center', padding: 20 }}>
            <Button
              size="large"
              type="primary"
              loading={loading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/posts/1`);

  return {
    props: {
      posts: data
    }
  };
}

export default Posts;
