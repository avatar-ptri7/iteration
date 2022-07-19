import React, { useState } from 'react';
import Modal from "react-modal";
import { useForm } from 'react-hook-form';
import MoneyHolder from '../rating/MoneyHolderRater.jsx';


Modal.setAppElement("#root");

const JobInfo = ({ show, onClose, item }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const appCloseDate = new Date(item.job_offer_expiration_timestamp).toDateString()

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className="job-details">
        <div className={"close-btn-ctn"}>
          <div style={{ flex: "1 90%" }} >
            <h1 style={{ marginBottom: "0" }}>{item.job_title}</h1>
            <p style={{ color: "gray", fontSize: "18px", marginTop: "5px", marginBottom: "30px" }} >{item.employer_name}</p>
          </div>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        <div>
          <div className="job-details-job">
            <p>Application Closes: {appCloseDate}</p>
            <p>Salary: {item.job_min_salary}-{item.job_max_salary}</p>
            <p>City: {item.job_city}</p>
            <p>Remote?: {item.job_is_remote}</p>
            <p>Type: {item.job_employment_type}</p>
            <p>Job Description: {item.job_description}</p>
          </div>
          <form className="job-details-wrapper" >
            <div style={styles.row}>
              <div style={{ marginRight: "10px" }}>
                <label htmlFor="employer">Company: </label>
                <input type="text" size="100" {...register("employer")} defaultValue={item.employer_name} />
              </div>
              <div>
                <label htmlFor="title">Job Title: </label>
                <input type="text" size="100" {...register("title")} defaultValue={item.job_title} />
              </div>
              <div>
                <label htmlFor="expiration">Application Closes: </label>
                <input type="text" size="100" {...register("expiration")} defaultValue={item.job_expiration} />
              </div>
            </div>

            <div style={styles.row}>
              <div>
                <label htmlFor="application">Application Link: </label>
                <input type="text" size="100" {...register("application")} defaultValue={item.application_link} />
              </div>
              <div>
                <label htmlFor="salary">Max Salary: </label>
                <input type="text" size="100" {...register("salary")} defaultValue={item.max_salary} />
              </div>
              <div>

                <label htmlFor="city">City: </label>
                <input type="text" size="100" {...register("city")} defaultValue={item.city} />
              </div>
            </div>

          </form>

          
          <label htmlFor="city">Job Description: </label>
          <div className="job-description">
            {item.description}
          </div>
          <button>Apply</button>
          <button>Favorite This Job</button>
            </div>
            <MoneyHolder id={item.job_id} />
            </div>
        </Modal>
       
    );
};

const styles = {
  row: {
    display: "flex",
    marginBottom: "20px"
  }
}

export default JobInfo;

