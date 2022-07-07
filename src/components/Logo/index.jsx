import React from 'react';
import './style.scss';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt-0">
      <Tilt
        className="Tilt br2 shadow-2"
        style={{ height: '150px', width: '150px' }}
      >
        <div className="tilt-box">
          <h1>
            <img src={brain} alt="brain.png" />
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
