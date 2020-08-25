import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

function StaticRatingStars() {
  return (
    <div>
      <StarRatingComponent
        name="rating"
        starCount={5}
        value={5}
      />
    </div>
  );
}

export default StaticRatingStars;
