import React, { useState } from 'react'
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import RangeSlider from 'react-bootstrap-range-slider';

import './TextToSpeech.css';

const TextToSpeech = () => {
    const url = 'https://name-pronunciation-service-be.el.r.appspot.com/voices'
    const [data, setData] = React.useState(null);
    const [name, setName] = React.useState('')
    const [voice, setVoice] = React.useState('en-GB-Wavenet-A');
    const [rate, setRate] = useState(1); 
    const [pitch, setPitch] = useState(1);

    const speakWithGoogle = async () => {

        const formData = new FormData();
        formData.append('language', 'en-GB');
        formData.append('voice', voice);
        formData.append('text', name);
        formData.append('pitch', pitch);
        formData.append('speakingRate', rate);
    
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

    React.useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response.data)
            setData(response.data);
        });
    }, []);

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleVoiceChange = (e) => {
        e.preventDefault();
        setVoice(e.target.value);
    };

    const handleRateChange = (e) => {
        e.preventDefault();
        setRate(e.target.value);
    };
    
    const handlePitchChange = (e) => {
        e.preventDefault();
        setPitch(e.target.value);
    };


    return (
        <div className="form">
            <Form>
                <Form.Group>
                    <Form.Label>Your name</Form.Label>
                    <Form.Control onChange={handleNameChange} type="text" placeholder="Fill in your name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Voice</Form.Label>
                    <Form.Select onChange={handleVoiceChange} value={voice}>
                        {
                            data && data.map(item => {
                                return <option>{item.name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rate</Form.Label>
                    <RangeSlider
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={rate}
                        onChange={changeEvent => setRate(changeEvent.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pitch</Form.Label>
                    <RangeSlider
                        min={0}
                        max={2}
                        step={0.1}
                        value={pitch}
                        onChange={changeEvent => setPitch(changeEvent.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={speakWithGoogle}>Try default pronunciation</Button>
            </Form>
        </div>
    )
}

export default TextToSpeech