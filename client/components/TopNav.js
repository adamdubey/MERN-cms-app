import { Menu } from 'antd';
import {
  AppstoreOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useState, useContext } from 'react';
import ToggleTheme from './ToggleTheme';
import Link from 'next/link';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';

const { SubMenu } = Menu;

const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // state
  const [current, setCurrent] = useState('mail');

  // hooks
  const router = useRouter();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const signOut = () => {
    // rm token from localStorage
    localStorage.removeItem('auth');

    // rm context
    setAuth({ user: null, token: '' });

    // redirect user
    router.push('/signin');
  };

  const roleBasedLink = () => {
    if (auth?.user?.role === 'Admin') {
      return '/admin';
    } else if (auth?.user?.role === 'Author') {
      return '/author';
    } else {
      return '/subscriber';
    }
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>MERN-CMS</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="posts" icon={<DatabaseOutlined />}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="contact" icon={<MailOutlined />}>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </Menu.Item>

      {auth?.user === null && (
        <>
          <Menu.Item
            style={{ marginLeft: 'auto' }}
            key="signup"
            icon={<UserAddOutlined />}
          >
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="signin" icon={<UserOutlined />}>
            <Link href="signin">
              <a>Sign In</a>
            </Link>
          </Menu.Item>
        </>
      )}
      {auth?.user !== null && (
        <>
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={auth?.user?.name || 'Dashboard'}
            style={{ marginLeft: 'auto' }}
          >
            <Menu.ItemGroup title="Management">
              <Menu.Item key="setting:2">
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item
            onClick={() => signOut()}
            key="signout"
            icon={<LogoutOutlined />}
          >
            <a>Sign Out</a>
          </Menu.Item>
        </>
      )}
      <Menu.Item>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
