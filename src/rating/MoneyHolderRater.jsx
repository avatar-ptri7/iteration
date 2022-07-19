
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
        console.log('response from DB ----->', response);
      })
      .catch((err) => console.log('Error in MoneyRating Component'));
  }, [rating]);


  return (
    
    <div className='moneyHolder'>
      {[...Array(5)].map((item, i) => (
        <MoneyRating
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
