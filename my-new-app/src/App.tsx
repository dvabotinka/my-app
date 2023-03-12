import './App.css';
import { Component } from "react";
import { setupRootStore } from "./store/menu/setup";
import { Provider } from "mobx-react";
import { MenuComponent } from './components/menu/Menu';
import { LoginComponent } from './components/auth/Login';
import { setupAuthRootStore } from './store/auth/setup';

interface Props {}

interface State {
  rootTree: any,
  authRootTree: any
}

class App extends Component<Props, State> 
{
  constructor(props: Props) {
    super(props);

    this.state = {
      rootTree: null,
      authRootTree: null
    };
  }

  componentDidMount = () => {
    const { rootTree } = setupRootStore();
    const { authRootTree } = setupAuthRootStore();
    this.setState({ rootTree, authRootTree });
  };

  render() {
    const { rootTree, authRootTree } = this.state;
    if (!rootTree || !authRootTree) return null;

    return (
      <div className="App">
      <header className="App-header">
      <Provider authRootTree={authRootTree}>
          <LoginComponent authRootTree={authRootTree} />
        </Provider>
      </header>
      <main className='App-main'>
      <Provider rootTree={rootTree}>
          <MenuComponent rootTree={rootTree} />
        </Provider>
      </main>
    </div>
    );
  }
}

export default App;