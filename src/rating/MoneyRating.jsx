import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaMoneyBill } from 'react-icons/fa';


const MoneyRating = ({
  handleMoneyClick,
  moneyCount,
  rating,
  setRating,
  hover,
  setHover,
  rank,
  id,
}) => {

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   setRating(rank);
  // });

  return (

          <IconContext.Provider value={{size: 50}}>
          <FaMoneyBill
            name='rating'
            className='money'
            rating={rating}
            onMouseEnter={() => setHover(moneyCount)}
            onMouseLeave={() => setHover(null)}
            color={moneyCount <=  (hover || rating) ? '#85BB65' : '#D3D3D3'}
            onClick={() =>{
              console.log('hello test');
              return handleMoneyClick(moneyCount)}}
          />
          </IconContext.Provider>
  );
};

export default MoneyRating;
