import { Component } from "react";
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

interface LoginComponentState {
  userLogin: string,
  userPassword: string,
}

class LoginComponent extends Component<
  LoginComponentProps,
  LoginComponentState>
{
  constructor(props: LoginComponentProps) {
    super(props);
    this.state = {
      userLogin: '',
      userPassword: ''
    }
  }

  componentDidMount() {
    const { authRootTree } = this.props;
    if(!authRootTree) return null;

    localStorage.setItem('Login', JSON.stringify([...authRootTree.login.users]));
  }

  changeUserLogin = (e: any) => {
    const userLogin = e.target.value;
    this.setState({ userLogin });
  }

  changeUserPassword = (e: any) => {
    const userPassword = e.target.value;
    this.setState({ userPassword });
  }

  onLogin = (e: any) => {
    e.preventDefault();
    
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

    const { userLogin, userPassword } = this.state;

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
  }

  render() {
    const { authRootTree } = this.props;
    const { userLogin, userPassword } = this.state;

    if (!authRootTree) return null;
    
    return (
      <div>
        <h1>Authorization</h1>
        <Form
          color="red"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item 
            label="Login" 
            name="login"
          >
            <Input 
              allowClear
              placeholder="input login" 
              value={userLogin} 
              onChange={this.changeUserLogin} 
            >
            </Input>
          </Form.Item>
          <Form.Item 
            label="Password" 
            name="password"
          >
            <Input 
              allowClear
              placeholder="input password" 
              value={userPassword} 
              onChange={this.changeUserPassword} 
            >
            </Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button 
                block 
                type='primary' 
                htmlType="submit" 
                onClick={ this.onLogin }
              >
                Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export { LoginComponent };