/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function SortingReviews(props) {
  return (
    <div className="sorting-reviews">
      <div className="sort-by-date">
        <select className="dropdown" onChange={() => { props.sortDate(); }}>
          <option value="">
            least recent
          </option>
          <option className="options">
            most recent
          </option>
        </select>
      </div>

      <div className="sort-by-date">
        <select className="dropdown" onChange={() => { props.sortRatings(); }}>
          <option value="">
            lowest to highest
          </option>
          <option value="">
            highest to lowest
          </option>
        </select>
      </div>
      <div className="sort-by-photos">
        <div className="checkbox-display">
          <input type="checkbox" id="fruit1" name="fruit-1" value="Apple" />
          <label htmlFor="fruit1">With photos</label>

          <input type="checkbox" id="fruit2" name="fruit-2" value="Apple2" />
          <label htmlFor="fruit2">Verified purchases</label>
        </div>

      </div>
    </div>
  );
}

export default SortingReviews;
