import { Progress } from 'antd';
import CountTo from 'react-count-to';
import Link from 'next/link';

const RenderProgress = ({ number, name, link = '#' }) => {
  return (
    <Link href={link}>
      <a>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108EE9',
            '50%': '#FFF',
            '100%': '#87D068'
          }}
          percent={100}
          format={() => <CountTo to={number} speed={number * 100} />}
        />
        <p style={{ marginTop: 18, color: '#555' }}>{name.toUpperCase()}</p>
      </a>
    </Link>
  );
};

export default RenderProgress;
