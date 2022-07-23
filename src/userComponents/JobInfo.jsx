import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import MoneyHolder from '../rating/MoneyHolderRater.jsx';
import ButtonApply from '../buttonApply/ButtonApply.jsx';
import Calendar from '../calendar/Calendar.jsx';

Modal.setAppElement('#root');

const JobInfo = ({ show, onClose, item, status, setStatus, jobInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [formData, setFormData] = useState({
    notes: 'Please enter notes about this job here.',
    body:''
  })
  const appCloseDate = new Date(
    item.job_offer_expiration_timestamp
  ).toDateString();

  console.log('***THIS IS ITEM FROM SHOW***', show);

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <div className="job-details">
        <div className="job-details-job_header">
          <div className={'close-btn-ctn'}>
            <div style={{ flex: '1 90%' }}>
              <h2 style={{ marginBottom: '0', textAlign: 'center' }}>
                {item.job_title}
              </h2>
              <p
                style={{
                  color: '172B4D',
                  fontSize: '30px',
                  marginTop: '5px',
                  marginBottom: '30px',
                  textAlign: 'center'
                }}
              >
                {item.employer_name}
              </p>
            </div>
         
         <Calendar id={item.job_id} jobInfo={jobInfo}/> 
         <label htmlFor='notes'>Your notes: </label>

          <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}   name='notes' id='notes'></textarea>
          <ButtonApply url={item.job_apply_link} item={item} id={item.job_id} status={status} setStatus={setStatus} />
          <button className='close-btn' onClick={
              () => { onClose(item.job_id, jobInfo.notes) }}>
              Close
            </button>
          </div>
        </div>
        <MoneyHolder id={item.job_id} item={item} />
        <div className="job-details-content">
          <p>Application Closes: {appCloseDate}</p>
          <p>
            Salary: {item.job_min_salary}-{item.job_max_salary}
          </p>
          <p>City: {item.job_city}</p>
          <p>Remote?: {item.job_is_remote}</p>
          <p>Type: {item.job_employment_type}</p>
          <p>Job Description: {item.job_description}</p>
        </div>
        <form className="job-details-wrapper">
          <Calendar id={item.job_id} />
          <label htmlFor="city">Your notes: </label>
          <div className="job-description">{item.description}</div>
          <ButtonApply
            url={item.job_apply_link}
            item={item}
            id={item.job_id}
            status={status}
            setStatus={setStatus}
          />
        </form>
      </div>
    </Modal>
  );
};

const styles = {
  row: {
    display: 'flex',
    marginBottom: '20px'
  }
};

export default JobInfo;
