import * as React from 'react';
import './App.css';
import Scene from './components/Scene/Scene';

function App() {

  React.useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }, []);

  return (
    <Scene />
  );
}

export default App;
