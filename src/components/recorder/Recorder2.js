import React from 'react';

import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });

        const file = new File(buffer, 'test.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });

        const formData = new FormData();
        // if you print blob in console you may get details of this obj
        //let blobWithProp = new Blob([blob["blob"]], blob["options"]);

        formData.append("file", file);

        const postRequest = {
          method: "POST",
          body: formData,
        };
        fetch("https://name-pronunciation-serv-store.el.r.appspot.com/store/user/U829891", postRequest)
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            const err = (data && data.message) || res.status;
            return Promise.reject(err);
          }
          console.log(data.blobInfo.mediaLink);
          this.setState({ contentUrl: data.blobInfo.mediaLink });

        })
        .catch((err) => {
          console.log(err);
        });


      }).catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
          <audio name="local" src={this.state.blobURL} controls="controls" />
          <audio name="server" src={this.state.contentUrl} controls="controls" />
        </header>
      </div>
    );
  }
}

export default Recorder2;