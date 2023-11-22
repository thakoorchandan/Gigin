import React, { useEffect, useState } from "react";
import Job from "../job/Job";
import "./Home.css";

const Home = () => {
  const [jobsData, setJobsData] = useState([]);

  const getData = async () => {
    try {
      const employeeId = "221516";
      const limit = 10;
      const offset = 0;

      const url = `https://dev123.gigin.ai/abc/index.php/v4/gigs/postings/list?limit=${limit}&offset=${offset}&is_precal_done=1&scope=recomm`;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      let ans = await fetch(url, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({ employee_id: employeeId }),
      });

      const response = await ans.json();

      // Check if the expected data field is present in the response
      if (response.data) {
        setJobsData(response.data);
        console.log("Jobs Data:", response.data); // Log the jobs data
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div>
        {jobsData.length > 0 ? (
          <Job jobsData={jobsData} />
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
