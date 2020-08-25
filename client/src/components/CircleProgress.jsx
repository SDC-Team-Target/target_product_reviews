import React from 'react';
// eslint-disable-next-line import/extensions
import Circle from './Circle.jsx';

const CircleProgress = (props) => (
  <div className="header-circular-bar">

    <div className="circle-inner">
      <Circle
        className="radial-bar"
        progress={75}
        color="#3c71d0"
      />
    </div>

    <div className="circular-would-recommend">
      75% would recommend
    </div>
    <div className="circular-recommended">
      3 recommendations
    </div>
  </div>
);

export default CircleProgress;
