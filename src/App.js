import React from 'react';

import AppContainer from './components/AppContainer/AppContainer';

import './App.css';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <AppContainer />
    </div>
  );
}

export default App;
