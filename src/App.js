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
      box: {},
    };
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data?.outputs[0]?.data?.regions[0]?.region_info?.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box });
  };

  onSubmit = async () => {
    const { input } = this.state;

    this.setState({ box: null }, () => {
      this.setState({ imageUrl: input });
    });
    
    const apiKey = process.env.REACT_APP_CLARIFAI_API_KEY;
    const app = new Clarifai.App({
      apiKey,
    });

    try {
      const response = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        input
      );
      this.displayFaceBox(this.calculateFaceLocation(response));
    } catch (err) {
      console.log('err', err);
    }
  };

  onEnter = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      this.onSubmit();
    }
  };

  render() {
    const { imageUrl, box } = this.state;
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
          onEnter={this.onEnter}
        />
        {imageUrl && <FaceRecognition src={imageUrl} box={box} />}
      </div>
    );
  }
}

export default App;
