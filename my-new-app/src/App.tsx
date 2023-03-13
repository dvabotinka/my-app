import './App.css';
import { Component } from "react";
import { setupRootStore } from "./store/menu/setup";
import { MenuComponent } from './components/menu/Menu';
import { LoginComponent } from './components/auth/Login';
import { setupAuthRootStore } from './store/auth/setup';
import { HeaderComponent } from './components/header/Header';
import { Route, Routes } from 'react-router-dom';

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
      <HeaderComponent></HeaderComponent>
      <main className="App-main">
        <Routes>
          <Route path='/' element={
            <div><h1>Prutean Stanislav CR-203</h1></div>
          } />
          <Route path='/login' element={
            <LoginComponent authRootTree={authRootTree} /> } 
          />
          <Route path='/menu' element={
            <MenuComponent rootTree={rootTree} /> } 
          />
        </Routes>
      </main>
    </div>
    );
  }
}

export default App;