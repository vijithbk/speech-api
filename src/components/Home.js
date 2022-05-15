import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Header from './header/Header';
import AppContainer from './AppContainer/AppContainer';
import TextToSpeech from '../components/text-to-speech/TextToSpeech'
import Speak from '../components/text-to-speech/Speak'
import Recorder from '../components/recorder/Recorder'
import Recorder2 from './recorder/Recorder2';

import './AppHub.css';

function Home() {
  return (
    <div className="appHub">
      <audio src='https://name-pronunciation-serv-store.el.r.appspot.com/store/user/data/U829891'></audio>
      <Header />
      <div className='home'>
        <div className='title'>You may either save the <b>System pronunciation</b> or do <b>Own Recording</b>.</div>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="home" title="System pronunciation">
            <TextToSpeech />
          </Tab>
          <Tab eventKey="profile" title="Own Recording">
            <Recorder2 />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
