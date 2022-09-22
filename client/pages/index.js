import { useContext } from 'react';
import { Button, Row, Col } from 'antd';
import { AuthContext } from '../context/auth';
import Head from 'next/head';
import FullWidthImage from '../components/pages/FullWidthImage';
import useNumbers from '../hooks/useNumbers';
import RenderProgress from '../components/posts/RenderProgress';
import useLatestPost from '../hooks/useLatestPost';
import useCategory from '../hooks/useCategory';
import Link from 'next/link';


function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPost();
  const { categories } = useCategory();

  return (
    <>
      <Head>
        <title>MERN CMS App</title>
        <meta name="description" content="blogging cms app" />
      </Head>
      <FullWidthImage />
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
          
          <h2>Blog Posts</h2>
          <div style={{ textAlign: 'center' }}>
            {latestPosts.map((post) => (<Link href={`/post/${post.slug}`}><a><h3>{post.title}</h3></a></Link>))}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Home;
