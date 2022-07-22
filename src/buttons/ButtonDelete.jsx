import axios from 'axios';
import React, { useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
const ButtonDelete = ({ id, item, setShow }) => {
    const buttonDeleteRef = useRef()
  const handleDelete = (e) => {
   console.log('e----->',e )
    if (window.confirm('Are you sure you want to delete')) {
    
      axios.delete(`${id}.json`).then((response) => console.log(response)); 
    }
   
    //setShow(false);
  };
  return (
    <button className='del-btn'>
      <FaTrashAlt   onClick={handleDelete} />
    </button>
  );
};
export default ButtonDelete;
