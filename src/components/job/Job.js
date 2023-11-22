import React, { useEffect, useState } from "react";

import "./job.css";

const Home = ({ jobsData }) => {
  // State hooks
  const [jobs, setJobs] = useState(jobsData);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobListColor, setJobListColor] = useState(true);
  const [myJobsColor, setMyJobsColor] = useState(false);

  // useEffect to filter applied jobs
  useEffect(() => {
    if (appliedJobs.length === 0) {
      setAppliedJobs(jobs.filter((job) => job.applied));
      setJobs((prevJobs) => prevJobs.filter((job) => !job.applied));
    }
  }, [jobs, appliedJobs]);

  // Function to handle job application
  function handleApply(index) {
    setJobs((prevJobs) => {
      const newJobs = prevJobs.slice();
      const appliedJob = newJobs[index];
      if (!appliedJob.applied) {
        appliedJob.applied = true;
        setAppliedJobs((prevAppliedJobs) => [
          ...prevAppliedJobs,
          appliedJob,
        ]);
      }
      return newJobs.filter((job, i) => i !== index);
    });
  }

  // Functions to toggle job list colors
  function toggleJobListColor() {
    setJobListColor(true);
    setMyJobsColor(false);
  }

  function toggleMyJobsColor() {
    setJobListColor(false);
    setMyJobsColor(true);
  }

  return (
    <div>
      {/* Header section */}
      <header className="homeHeader">
        <div className="joblist" onClick={toggleJobListColor}>
          <p>Job List</p>
          <span style={{ background: jobListColor ? "blue" : "grey" }}></span>
        </div>
        <div className="myjobs" onClick={toggleMyJobsColor}>
          <p>My Jobs</p>
          <span style={{ background: myJobsColor ? "blue" : "grey" }}></span>
        </div>
      </header>

      {/* Job List section */}
      <div className="jobCompWrapper">
        {jobListColor &&
          jobs.map((el, index) => (
            <div key={el.id} className="jobContainer">
              <div className="title">{el?.dtls?.ttl}</div>
              <div className="location">{el?.dtls?.loc?.city}</div>
              <button
                onClick={() => handleApply(index)}
                style={{
                  backgroundColor: el.applied ? "green" : "purple",
                }}
              >
                {el.applied ? "Applied" : "Apply"}
              </button>
            </div>
          ))}
      </div>

      {/* Applied Jobs section */}
      {myJobsColor && (
        <div className="jobCompWrapper">
          {appliedJobs.map((el) => (
            <div key={el.id} className="jobContainer">
              <div className="title">{el?.dtls?.ttl}</div>
              <div className="location">{el?.dtls?.loc?.city}</div>
              <button style={{ backgroundColor: "green" }}>Applied</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
