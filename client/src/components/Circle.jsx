import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';

const DEFAULT_COLOR = '#040404';
class RadialChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // For initial animation
    setTimeout(() => {
      this.setState({ setStrokeLength: true });
    });
  }

  render() {
    const { setStrokeLength } = this.state;
    const {
      className,
      radius,
      progress,
      strokeWidth,
      dimension,
      color,
    } = this.props;

    const circleRadius = Math.min(radius, 70);
    const circumference = 2 * 3.14 * circleRadius;
    const strokeLength = setStrokeLength ? circumference / 100 * progress : 0;
    return (
      <div
        className={classNames('radial-chart', className, {
          'no-progress': strokeLength === 0,
        })}
      >
        <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
          <circle
            className="radial-chart-total"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            cx="90"
            cy="90"
            r={circleRadius}
          />
          <circle
            className="radial-chart-progress"
            stroke="#008300"
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeLength},${circumference}`}
            strokeLinecap="round"
            fill="none"
            cx="90"
            cy="90"
            r={circleRadius}
          />
          <text
            textAnchor="middle"
            fontSize="55"
            fontWeight="bold"
            fill="#006601"
            x="90"
            y="110"
          >
            {progress}
          </text>
        </svg>
      </div>
    );
  }
}
RadialChart.defaultProps = {
  radius: 80,
  progress: 100,
  strokeWidth: 10,
  dimension: 60,
  color: DEFAULT_COLOR,
};
RadialChart.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
  progress: PropTypes.number,
  dimension: PropTypes.number,
};
export default RadialChart;
