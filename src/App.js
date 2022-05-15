import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppHub from './components/AppHub';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<AppHub/>}/>
          <Route exact path="/home" element={<Home/>}/>
        </Routes>
    </Router>
  );
}

export default App;
