/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';
import '../styles/styles.css';
import StarRatingComponent from 'react-star-rating-component';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="review-list">
        <ul>
          { this.props.reviews.map((item, idx) => (
            <div className="list" key={idx}>
              <div className="review-only">
                <div>
                  <h4 className="title">
                    { item.review_title }
                  </h4>
                </div>
                <div className="star">
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={item.rating}
                  />
                </div>
                <div className="timebox">
                  <span>{ item.customer_name }</span>
                  <span> - </span>
                  {/* use momentjs to format date */}
                  <span>{ moment(item.date).calendar() }</span>
                </div>
                <div className="itemReview">
                  { item.review }
                </div>
              </div>
            </div>
          )) }
        </ul>
      </div>
    );
  }
}

export default ReviewList;
