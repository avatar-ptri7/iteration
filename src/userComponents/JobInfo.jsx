import React from 'react';
import Modal from "react-modal";
import { useForm } from 'react-hook-form';

Modal.setAppElement("#root");

const JobInfo = ({ show, onClose, item }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

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

          <form className="job-details-wrapper" >
            <div className="job-details-job"></div>
            <div style={styles.row}>
              <div style={{ marginRight: "10px" }}>
                <label for="employer">Company: </label>
                <input type="text" size="100" {...register("employer")} defaultValue={item.employer_name} />
              </div>
              <div>
                <label for="title">Job Title: </label>
                <input type="text" size="100" {...register("title")} defaultValue={item.job_title} />
              </div>
              <div>
                <label for="expiration">Application Closes: </label>
                <input type="text" size="100" {...register("expiration")} defaultValue={item.job_expiration} />
              </div>
            </div>

            <div style={styles.row}>
              <div>
                <label for="application">Application Link: </label>
                <input type="text" size="100" {...register("application")} defaultValue={item.application_link} />
              </div>
              <div>
                <label for="salary">Max Salary: </label>
                <input type="text" size="100" {...register("salary")} defaultValue={item.max_salary} />
              </div>
              <div>

                <label for="city">City: </label>
                <input type="text" size="100" {...register("city")} defaultValue={item.city} />
              </div>
            </div>

          </form>

          
          <label for="city">Job Description: </label>
          <div className="job-description">
            {item.description}
          </div>
          <button>Apply</button>
          <button>Favorite This Job</button>
        </div>
      </div>
    </Modal >
  );
};

const styles = {
  row: {
    display: "flex",
    marginBottom: "20px"
  }
}

export default JobInfo;

