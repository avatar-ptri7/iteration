
import React, { useState, useEffect } from 'react';
import MoneyRating  from './MoneyRating.jsx'
import axios from 'axios';

const MoneyHolder = ({ id, rank }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  
    useEffect(() => {
      axios
        .get('/users/rank', {
          params: {
            id: `${id}`
          }
        })
        .then((data => {
          setRating(data.data.rows[0].rank)
          console.log('THIS IS WHAT I SET RATING AS --> ',data.data.rows[0].rank)
        }))
        .catch((err) => console.log('Error in MoneyRating Component get request'));
    }, []);
  
  const handleMoneyClick = async (moneyCount) => {
    await setRating(moneyCount)

    axios
      .post('/users/rank', {
        id: `${id}`,
        rating: `${moneyCount}`,
      })
      .then((response) => {
        //need to handle the response sending to the JobCard to display
      })
      .catch((err) => console.log('Error in MoneyRating Component post request'));

}
  // useEffect(() => {
  //   axios
  //     .post('/users/rank', {
  //       id: `${id}`,
  //       rating: `${rating}`,
  //     })
  //     .then((response) => {
  //       //need to handle the response sending to the JobCard to display
  //     })
  //     .catch((err) => console.log('Error in MoneyRating Component post request'));
  // }, [rating]);

  return (
    
    <div className='moneyHolder'>
      <table>
        <tbody>
          <tr>
            <td>Rate This Job</td>
            <td>{[...Array(5)].map((item, i) => (
                <MoneyRating
                  key={i}
                  moneyCount={i + 1}
                  rating={rating}
                  setRating={setRating}
                  hover={hover}
                  setHover={setHover}
                  id={id}
                  rank={rank}
                  handleMoneyClick = {handleMoneyClick}
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      

    </div>
  );
};
export default MoneyHolder;
