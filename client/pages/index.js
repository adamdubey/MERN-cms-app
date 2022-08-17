import { useContext } from 'react';
import { Button } from 'antd';
import { AuthContext } from '../context/auth';

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      <Button>Click Me</Button>
      <br />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
}

export default Home;
