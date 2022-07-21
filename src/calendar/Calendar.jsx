import React, { Fragment, useState } from 'react';
import  DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//import { DropdownDate, DropdownComponent } from 'react-dropdown-date';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='calendar-holder'>
    <DatePicker selected={startDate} 
    onChange={date => setStartDate(date)} />
    </div>
      );
   
    //   <DatePicker
    //     selected={startDate}
    //     onChange={(date) => setStartDate(date)}
    //   />
   
 
};

export default Calendar;
