import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewMetaData from './components/ReviewMetaData.jsx'
import ReviewSort from './components/ReviewSort.jsx'
import ReviewList from './components/ReviewList.jsx'
import MoreReviews from './components/MoreReviews.jsx'
import AddReview from './components/AddReview.jsx'
import ReviewModal from './components/ReviewModal.jsx'


function RatingsAndReviews (props) {

  const [reviews, setReviews] = useState([]);
  const [reviewsrenderedcount, setReviewsrenderedcount] = useState(2);
  const [sortoption, setSortoption] = useState('relevant');
  const [selectedstars, setSelectedstars] = useState([]);
  const [reviewmodalshow, setReviewmodalshow] = useState(false);
  const [productChars, setProductChars] = useState({'hello': 1});

  useEffect (() => {
    axios.get('/reviews',
          {
            params: {
              product_id : props.product_id,
              page : 1,
              count : 100,
              sort : `${sortoption}`
            }
          }
        )
    // axios.get(`/reviews/?product_id=37315&page=1&count=500&sort=relevant`)
    .then((results)=>{
      setReviews(results.data.results)
      // console.log('successfully get all reviews')
    })
    .catch((err)=>{console.log(err)});
  }, [sortoption]);

  const [filteredreview, setFilteredreview] = useState([]);

  useEffect(()=>{
    setFilteredreview(reviews.filter(review => selectedstars.indexOf(review.rating) !== -1));
  }, [selectedstars]);

  return(
    <div>
      <h1>Ratings And Reviews</h1>
      <ReviewMetaData product_id={props.product_id} selectedstars={selectedstars} setSelectedstars={setSelectedstars} setReviewsrenderedcount={setReviewsrenderedcount}
      setProductChars={setProductChars} setAvgReviewRating={props.setAvgReviewRating}/>

      <ReviewSort reviews={reviews} setSortoption={setSortoption}/>

      <ReviewList reviews={reviews} setReviews={setReviews} reviewsrenderedcount={reviewsrenderedcount} selectedstars={selectedstars} filteredreview={filteredreview}/>

      {reviewsrenderedcount < reviews.length && filteredreview.length === 0?
      <MoreReviews reviewsrenderedcount={reviewsrenderedcount} setReviewsrenderedcount={setReviewsrenderedcount}/>
      :
      reviewsrenderedcount < filteredreview.length && filteredreview.length !== 0?
      <MoreReviews reviewsrenderedcount={reviewsrenderedcount} setReviewsrenderedcount={setReviewsrenderedcount}/>
      : null}

      <AddReview setReviewmodalshow={setReviewmodalshow}/>

      { reviewmodalshow
        ?
        <ReviewModal
        product_id={props.product_id}
        productChars={productChars}
        setReviewmodalshow={setReviewmodalshow}/>
        :
        null
      }


    </div>
  )
}

export default RatingsAndReviews;


