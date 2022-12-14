import { useContext } from 'react';
import { Avatar, Button, Card, Col, Divider, Row, Typography } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from '../../context/theme';
import CommentForm from '../../components/comments/CommentForm';
import { List } from 'rc-field-form';
import { ShareSocial } from 'react-share-social';
import useCategory from '../../hooks/useCategory';
import useLatestPost from '../../hooks/useLatestPost';

const { Meta } = Card;
const { Title } = Typography;

dayjs.extend(relativeTime);

export const SinglePost = ({ post, postComments }) => {
  // context
  const [theme, setTheme] = useContext(ThemeContext);

  // state
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPost();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/comment/${post._id}`, { comment });
      setComments([data, ...comments]);
      setComment('');
      toast.succsss('Comment posted successfully');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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

            <div style={{ marginTop: '-20px', marginBottom: '15px' }}>
              <ShareSocial
                url={process.browser && window.location.href}
                socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
                style={{
                  height: '100px',
                  overflow: 'hidden',
                  background: 'none'
                }}
              />
            </div>

            <Editor
              dark={theme === 'light' ? false : true}
              readOnly={true}
              defaultValue={post.content}
            />

            <CommentForm
              comment={comment}
              setComment={setComment}
              handleSubmit={handleSubmit}
              loading={loading}
            />

            <div style={{ marginBottom: 50 }}></div>

            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item._id} id={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>}
                    title={item?.postedBy?.name}
                    description={`${item.content} - ${dayjs(
                      item.createdAt
                    ).fromNow()}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={22} xl={6} offset={1}>
          <Divider>Categories</Divider>
          {categories.map((c) => (
            <Link href={`/category/${c.slug}`} key={c._id}>
              <a>
                <Button style={{ margin: 2 }}>{c.name}</Button>
              </a>
            </Link>
          ))}

          <Divider>Latest Posts</Divider>
          {latestPosts.map((p) => (
            <Link href={`/post/${p.slug}`} key={p._id}>
              <a>
                <h4>{p.title}</h4>
              </a>
            </Link>
          ))}
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
      post: data.post,
      postComments: data.comments
    }
  };
}

export default SinglePost;
