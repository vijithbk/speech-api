import React from 'react';

import Header from './header/Header';
import SpeechDemo from './speech-demo/SpeechDemo'

import './AppHub.css';

function AppHub() {
  return (
    <div className="appHub">
      <Header location="apphub" />
      <SpeechDemo />
    </div>
  );
}

export default AppHub;
