import React from 'react';
import './style.scss';

const ImageLinkForm = ({ onInputChange }) => {
  return (
    <div>
      <p className="f3 center">
        {'The Magic Brain will detect faces in your pictures. Gives it a try'}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointers">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
