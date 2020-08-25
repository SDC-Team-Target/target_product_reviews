/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from 'react';
import Filler from './Filler.jsx';

const ProgressBar = (props) => (
  <div className="progress-bar">

    <Filler percentage={props.percentage} />
  </div>
);

export default ProgressBar;
