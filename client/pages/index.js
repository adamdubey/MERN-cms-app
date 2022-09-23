import { useEffect, useContext, useState } from 'react';
import { Button, Row, Col, Divider } from 'antd';
import { AuthContext } from '../context/auth';
import Head from 'next/head';
import FullWidthImage from '../components/pages/FullWidthImage';
import useNumbers from '../hooks/useNumbers';
import RenderProgress from '../components/posts/RenderProgress';
import useLatestPost from '../hooks/useLatestPost';
import useCategory from '../hooks/useCategory';
import Link from 'next/link';
import ParallaxImage from '../components/pages/ParallaxImage';
import { ThunderboltOutlined } from '@ant-design/icons';
import Footer from '../components/pages/Footer';
import axios from 'axios';
import useHome from '../hooks/useHome';

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPost();
  const { categories } = useCategory();
  const {
    title,
    subtitle,
    fullWidthImageset,
    setTitle,
    setSubtitle,
    setFullWidthImage
  } = useHome();

  return (
    <>
      <Head>
        <title>MERN CMS App</title>
        <meta name="description" content="blogging cms app" />
      </Head>
      <FullWidthImage
        title={title}
        subtitle={subtitle}
        fullWidthImage={fullWidthImage?.url}
      />
      <Row style={{ marginTop: 40 }}>
        <Col
          span={6}
          style={{ marginTop: 100, textAlign: 'center', fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.posts}
            name="Posts"
            link="/admin/posts"
          />
        </Col>

        <Col
          span={6}
          style={{ marginTop: 100, textAlign: 'center', fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.comments}
            name="Comments"
            link="/admin/comments"
          />
        </Col>

        <Col
          span={6}
          style={{ marginTop: 100, textAlign: 'center', fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.categories}
            name="Categories"
            link="/admin/categories"
          />
        </Col>

        <Col
          span={6}
          style={{ marginTop: 100, textAlign: 'center', fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.users}
            name="Users"
            link="/admin/users"
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <ParallaxImage>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '75px',
                textShadow: '2px 2px 4px #000000',
                color: '#FFF'
              }}
            >
              Blog Posts
            </h2>
            <Divider>
              <ThunderboltOutlined />
            </Divider>
            <div style={{ textAlign: 'center' }}>
              {latestPosts.map((post) => (
                <Link href={`/post/${post.slug}`} key={post._id}>
                  <a>
                    <h3>{post.title}</h3>
                  </a>
                </Link>
              ))}
            </div>
          </ParallaxImage>
        </Col>
      </Row>

      <Row>
        <Col
          span={24}
          style={{ textAlign: 'center', marginTop: 80, marginBottom: 80 }}
        >
          <Divider>Categories</Divider>
          <div style={{ textAlign: 'center' }}>
            {categories.map((c) => (
              <Link href={`/category/${c.slug}`} key={c._id}>
                <a>
                  <Button style={{ margin: 2 }}>{c.name}</Button>
                </a>
              </Link>
            ))}
          </div>
        </Col>
      </Row>

      <Footer />
    </>
  );
}

export default Home;
