import axios from 'axios';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
const ButtonDelete = ({ id }) => {
  
  const handleDelete = (e) => {
   console.log('e----->',e )
   e.stopPropagation();
    if (window.confirm('Are you sure you want to delete')) {
    //   axios.delete(`/users/deletejob`), {
    //     data: 
    //     {
    //     id: `${id}`
    //     }
    // })
    //   .then((response) => console.log(response))
    //   .catch(err => console.log('Error in the Delete button')); 
    axios.post('/users/deletejob', {
        id: `${id}`
    })
    .then(response => console.log(response))
    .catch(err => console.log('Error inside of handleDelete button'));
    }
  };
  return (
    <button className='del-btn'>
      <FaTrashAlt   onClick={handleDelete} />
    </button>
  );
};
export default ButtonDelete;
