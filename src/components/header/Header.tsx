import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  MenuOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('login');

  const handleMenuClick = (e: any) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Header>
      <Menu 
        theme="dark"
        mode="horizontal" 
        selectedKeys={[current]} 
        onClick={handleMenuClick}
        style={{ display: 'flex', justifyContent: 'center' }}
        items={[
          {
            label: 'Home',
            key: '/',
            icon: <HomeOutlined style={{ color: 'white', marginRight: '10px' }} />,
          },
          {
            label: 'Login',
            key: '/login',
            icon: <UserOutlined style={{ color: 'white', marginRight: '10px' }} />,
          },
          {
            label: 'Menu',
            key: '/menu',
            icon: <MenuOutlined style={{ color: 'white', marginRight: '10px' }} />,
          },
        ]}
      />
    </Header>
  );
};

export { HeaderComponent };