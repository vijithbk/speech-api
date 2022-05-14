import React from 'react';

import TextToSpeech from '../text-to-speech/TextToSpeech'
import Speak from '../text-to-speech/Speak'
import Recorder from '../recorder/Recorder'

import './AppContainer.css';

function AppContainer() {
  return (
    <div className='AppContainer'>
      <div className="item">
          <TextToSpeech />
      </div>

      <div className="item">
        <Recorder />
      </div>
    </div>
  );
}

export default AppContainer;
