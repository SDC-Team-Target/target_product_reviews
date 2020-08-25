/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Filler = (props) => (
  <div
    className="filler"
    style={{ width: `${props.percentage}%` }}
  />
);

export default Filler;
