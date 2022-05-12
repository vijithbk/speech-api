import React from 'react'
import axios from "axios";
import data from '../../data/voices.json'

const speakWithGoogle = async () => {

    const formData = new FormData();
    // formData.append('language', this.selectedLanguage);
    // formData.append('voice', this.selectedVoice);
    // formData.append('text', this.text);
    // formData.append('pitch', this.pitch.toString());
    // formData.append('speakingRate', this.speakingRate.toString());



    let mp3Bytes = null;
    try {
        const response = await fetch('https://name-pronunciation-service-be.el.r.appspot.com/speak?language=en-GB&voice=en-GB-Wavenet-A&text=hello sanjib how are youhello sanjib how are youhello sanjib how are youhello sanjib how are you&pitch=1.5&speakingRate=1.3', {
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

const Speak = () => {
    const url = ''
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        //speakWithGoogle()
    }, []);


    return (
        <div>
            <button onClick={speakWithGoogle}>Click</button>
        </div>
    )
}

export default Speak