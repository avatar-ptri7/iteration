import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

//import { DropdownDate, DropdownComponent } from 'react-dropdown-date';

const Calendar = ({ id }) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateSelect =  () => {
    const newDate = startDate.toDateString();
    console.log('inside of calendar newDate ----->', typeof newDate);
      axios.post('/users/addtime', {
        id: `${id}`,
        date : `${newDate}`
      })
      .then(response => console.log(response))
      .catch(err => console.log('Error inside of Calendar handleDateSelect'));

  }
  return (
    <div className='calendar-holder'>
      {' '}
      Date Applied To Job
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelect}
        onChange={(date) => {
          console.log(date);
          setStartDate(date);
        }}
      />
    </div>
  );

  //   <DatePicker
  //     selected={startDate}
  //     onChange={(date) => setStartDate(date)}
  //   />
};

export default Calendar;
