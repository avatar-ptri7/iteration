
import React, { useState, useEffect } from 'react';
import MoneyRating  from './MoneyRating.jsx'
import axios from 'axios';

const MoneyHolder = ({ id }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    axios
      .post('/users/rank', {
        id: `${id}`,
        rating: `${rating}`,
      })
      .then((response) => {
        //need to handle the response sending to the JobCard to display
      })
      .catch((err) => console.log('Error in MoneyRating Component'));
  }, [rating]);


  return (
    
    <div className='moneyHolder'>
      Rate This Job
      {[...Array(5)].map((item, i) => (
        <MoneyRating
          key={i}
          moneyCount={i + 1}
          rating={rating}
          setRating={setRating}
          hover={hover}
          setHover={setHover}
          id={id}
        />
      ))}
    </div>
  );
};
export default MoneyHolder;
