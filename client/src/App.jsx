/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import './styles/styles.css';
import CircleProgress from './components/CircleProgress.jsx';
import DisplayProgressBar from './components/DisplayProogressBar.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewButton from './components/ReviewButton.jsx';
import RatingSummary from './components/RatingSummay.jsx';
import SortingReviews from './components/SortingReviews.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      products: [],
      customerName: '',
      title: '',
      review: '',
      rating: 0,
      quality: 0,
      value: 0,
      // eslint-disable-next-line no-undef
      item_id: window.product_id || 1,
      percentage: 80,
    };

    // function binding
    this.getProducts = this.getProducts.bind(this);
    this.getReview = this.getReview.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.sortDate = this.sortDate.bind(this);
    this.sortRatings = this.sortRatings.bind(this);
  }

  // Invokes function immediately after a component is mounted
  componentDidMount() {
    this.getReview();
    this.getProducts();
  }

  // function for star review component
  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  // Axios request to get the products from the server
  // getProducts(item_id = this.state.item_id) {
  //   axios.get(`http://ec2-52-14-146-214.us-east-2.compute.amazonaws.com:8080/products/${item_id}`)
  //     .then((res) => {
  //       this.setState({
  //         products: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log('Error getitng the products from client', err);
  //     });
  // }

  // Axios request to get the reviews from the server
  getReview(item_id = this.state.item_id) {
    axios.get(`/reviews/${item_id}`)
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
      })
      .catch((err) => {
        console.log('Error getitng the data', err);
      });
  }

  // set each state to current target value
  // e.target.name is inside parenthesis because it is a variable
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // function to sort reviews by date
  sortDate() {
    const { reviews } = this.state;
    const newReviews = reviews.reverse();
    this.setState({
      reviews: newReviews.sort((a, b) => a.date > b.date),
    });
  }

  // function to sort reviews by star-ratings
  sortRatings() {
    const { reviews } = this.state;
    const newRating = reviews.reverse();
    this.setState({
      reviews: newRating.sort((a, b) => a.rating > b.rating),
    });
  }

  // function to update the state once the form is submitted
  submitHandler(e) {
    e.preventDefault();
    axios.post(`/review`, {
      customer_name: this.state.customerName,
      review_title: this.state.title,
      review: this.state.review,
      rating: this.state.rating,
      item_id: this.state.item_id,
    })
      .then(() => this.getReview(this.state.item_id))
      .then(() => this.getReview(this.state.item_id))
    // Clear the form once the form is submitted
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        this.setState({
          customerName: '',
          title: '',
          review: '',
          rating: 0,
          quality: 0,
          value: 0,
          // eslint-disable-next-line react/no-access-state-in-setstate
          item_id: this.state.item_id,
        });
      })
      .catch((err) => {
        console.log('Error posting reviews in Client', err);
      });
  }

  render() {
    return (
      <div className="containerRC">
        <div>
          <h2 className="heading">Guest Ratings &amp; Reviews</h2>
        </div>
        <div className="header-stats-container">
          <DisplayProgressBar percentage={this.state.products} />
          <RatingSummary percentage={this.state.products} />
          <CircleProgress />
        </div>
        <div className="review">
          <ReviewButton
            getReview={this.getReview}
            customerName={this.state.customerName}
            title={this.state.title}
            review={this.state.review}
            rating={this.state.rating}
            onStarClick={this.onStarClick}
            changeHandler={this.changeHandler}
            submitHandler={this.submitHandler}
          />
        </div>
        <SortingReviews sortDate={this.sortDate} sortRatings={this.sortRatings} />
        <div className="total-reviews">
          { this.state.products.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx}>
              We found
              {' '}
              { item.total_reviews }
              {' '}
              matching reviews
            </div>
          )) }
        </div>
        <ReviewList reviews={this.state.reviews} />
      </div>
    );
  }
}

export default App;
