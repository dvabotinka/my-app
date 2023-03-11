import './App.css';
import { Component } from "react";
import { setupRootStore } from "./store/menu/setup";
import { Provider } from "mobx-react";
import { MenuComponent } from './components/menu/Menu';

interface Props {}

interface State {
  rootTree: any
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rootTree: null
    };
  }
  componentDidMount = () => {
    const { rootTree } = setupRootStore();
    this.setState({ rootTree });
  };
  render() {
    const { rootTree } = this.state;
    if (!rootTree) return null;
    return (
      <div className="App">
      <header className="App-header">
      <Provider rootTree={rootTree}>
        <MenuComponent/>
      </Provider>
      </header>
    </div>
    );
  }
}

export default App;