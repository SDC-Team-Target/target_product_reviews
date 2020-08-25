import React from 'react';

function RadialBarChart() {
  return (
    <div>
      <svg aria-hidden="true">
        <circle
          stroke="#f7f7f7"
          fill="transparent"
          cx="26.5"
          cy="26.5"
          r="25"
          strokeWidth="3"
        />
        <circle
          stroke="#008300"
          fill="transparent"
          cx="26.5"
          cy="26.5"
          r="25"
          strokeWidth="3"
          strokeDasharray="157.07963267948966, 160"
          strokeLinecap="round"
          transform="rotate(-90 26.5 26.5)"
        />
        <text
          textAnchor="middle"
          fontSize="16"
          fill="#006601"
          x="26.5"
          y="32.9"
          data-test="value"
        >
          100
        </text>
      </svg>
    </div>
  );
}

export default RadialBarChart;
