import React from 'react';
import Particles from 'react-tsparticles';
import particleOptions from './helpers/particleOptions';
import { particlesInit, particlesLoaded } from './helpers/particlesFunc';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import FaceRecognition from './components/FaceRecognition';
import './App.scss';
import Clarifai from 'clarifai';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    const { input } = this.state;

    const apiKey = process.env.REACT_APP_CLARIFAI_API_KEY;
    const app = new Clarifai.App({
      apiKey
    });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      (res) => {
        console.log('res', res);
        this.setState({ imageUrl: input });
      },
      (err) => {
        console.log('err', err);
      }
    );
  };

  render() {
    const { imageUrl } = this.state;
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          className="particles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
        />
        {imageUrl && <FaceRecognition src={imageUrl} />}
      </div>
    );
  }
}

export default App;
