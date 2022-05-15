import React, { useState } from 'react'
import { FcStart } from 'react-icons/fc';
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import RangeSlider from 'react-bootstrap-range-slider';

import sandeep from "../../images/sandeep.png"
import sanjib from "../../images/sanjib.png"
import sarah from "../../images/sarah.png"
import vijith from "../../images/vijith.jpg"

import './SpeechDemo.css';

const SpeechDemo = () => {

    const speakWithGoogle = async (name, voice) => {

        const formData = new FormData();
        formData.append('language', 'en-GB');
        formData.append('voice', voice);
        formData.append('text', name);
        formData.append('pitch', '1');
        formData.append('speakingRate', '1');
    
        let mp3Bytes = null;
        try {
            // ?language=en-GB&voice=en-GB-Wavenet-A&text=hello sanjib how are youhello sanjib how are youhello sanjib how are youhello sanjib how are you&pitch=1.5&speakingRate=1.3
            const response = await fetch('https://name-pronunciation-service-be.el.r.appspot.com/speak', {
                body: formData,
                method: 'POST'
            });
            mp3Bytes = await response.arrayBuffer();
        } catch (e) {
    
        }
    
        if (mp3Bytes !== null) {
            const audioContext = new AudioContext();
            const audioBufferSource = audioContext.createBufferSource();
    
            audioBufferSource.buffer = await audioContext.decodeAudioData(mp3Bytes);
    
            audioBufferSource.connect(audioContext.destination);
            audioBufferSource.loop = false;
            audioBufferSource.start(0);
        }
    }

    return (
        <React.Fragment>
            <div className='speechDemo'>
                <div className='recent'>Here are some of our recent users...</div>
                <div className='demo'>
                    <div className='box'>
                        <div className='img'><img src={sarah} width="160" /></div>
                        <div className='boxname'>Sarah Marry</div>
                        <div className='play'>
                        <Button variant="link" onClick={() => speakWithGoogle('Sarah Marry', 'en-GB-Wavenet-A')}>
                            <FcStart size="4em" />
                        </Button>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='img'><img src={sanjib} width="160" /></div>
                        <div className='boxname'>Sanjib Sahu</div>
                        <div className='play'>
                        <Button variant="link" onClick={() => speakWithGoogle('Sanjib Sahu', 'en-GB-Wavenet-B')}>
                            <FcStart size="4em" />
                        </Button>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='img'><img src={sandeep} width="160" /></div>
                        <div className='boxname'>Sandeep Kandala</div>
                        <div className='play'>
                        <Button variant="link" onClick={() => speakWithGoogle('Sandeep Kandala', 'en-US-Wavenet-I')}>
                            <FcStart size="4em" />
                        </Button>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='img'><img src={vijith} width="160" /></div>
                        <div className='boxname'>Vijith Balakrishnan</div>
                        <div className='play'>
                        <Button variant="link" onClick={() => speakWithGoogle('Vijith Balakrishnan', 'en-IN-Wavenet-B')}>
                            <FcStart size="4em" />
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SpeechDemo