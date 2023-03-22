import { useState } from "react";
import { AuthRoot, UserLogin } from "../../store/auth";
import 'antd/dist/reset.css';
import { 
  Button, 
  Input, 
  Form,
  message
} from 'antd';

interface LoginComponentProps {
  authRootTree?: AuthRoot
}

const LoginComponent: React.FC<LoginComponentProps> = ({ authRootTree }) => { 
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  if (authRootTree) {
    localStorage.setItem('Login', JSON.stringify([...authRootTree.login.users]));
  }

  function changeUserLogin(e: any) {
    setUserLogin(e.target.value);
  }

  function changeUserPassword(e: any) {
    setUserPassword(e.target.value);
  }

  function onLogin() {
    const login = localStorage.getItem('Login');
    const users = login ? JSON.parse(login) : [];
  
    if (users.length === 0) {
      message.open({
        key: 'updatable',
        type: 'loading',
        content: 'Checking...',
      });
      setTimeout(() => {
        message.open({
          key: 'updatable',
          type: 'error',
          content: 'There is no data of users in localStorage',
          duration: 2,
        });
      }, 1000);

      return;
    }

    const user = users.find((u: UserLogin) => 
      u.login === userLogin && 
      u.password === userPassword);
    
    if (!user) {
      message.open({
        key: 'updatable',
        type: 'loading',
        content: 'Checking...',
      });
      setTimeout(() => {
        message.open({
          key: 'updatable',
          type: 'warning',
          content: 'Login or password is not correct',
          duration: 2,
        });
      }, 1000);

      return;
    }

    message.open({
      key: 'updatable',
      type: 'loading',
      content: 'Checking...',
    });
    setTimeout(() => {
      message.open({
        key: 'updatable',
        type: 'success',
        content: 'Login successful',
        duration: 2,
      });
    }, 1000);
  };
  
  return (
    <div>
      <h1>Authorization</h1>
      <Form
        color="red"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onLogin}
      >
        <Form.Item 
          label="Login" 
          name="login"
          rules={[{ required: true, message: 'Please, input your login' }]}
        >
          <Input 
            allowClear
            placeholder="input login" 
            value={userLogin} 
            onChange={changeUserLogin} 
          >
          </Input>
        </Form.Item>
        <Form.Item 
          label="Password" 
          name="password"
          rules={[{ required: true, message: 'Please, input your password' }]}
        >
          <Input 
            allowClear
            placeholder="input password" 
            value={userPassword} 
            onChange={changeUserPassword} 
          >
          </Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button 
              block 
              type='primary' 
              htmlType="submit" 
            >
              Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { LoginComponent };