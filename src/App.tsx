import './App.css';
import { useState, useEffect } from 'react';
import { setupRootStore } from './store/menu/setup';
import { MenuComponent } from './components/menu/Menu';
import { LoginComponent } from './components/auth/Login';
import { setupAuthRootStore } from './store/auth/setup';
import { HeaderComponent } from './components/header/Header';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const [rootTree, setRootTree] = useState<any>(null);
  const [authRootTree, setAuthRootTree] = useState<any>(null);

  useEffect(() => {
    const { rootTree } = setupRootStore();
    const { authRootTree } = setupAuthRootStore();
    setRootTree(rootTree);
    setAuthRootTree(authRootTree);
  }, []);

  if (!rootTree || !authRootTree) return null;

  return (
    <div className="App">
      <HeaderComponent />
      <main className="App-main">
        <Routes>
          <Route path='/' element={<div><h1>Prutean Stanislav CR-203</h1></div>} />
          <Route path='/login' element={<LoginComponent authRootTree={authRootTree} />} />
          <Route path='/menu' element={<MenuComponent rootTree={rootTree} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;