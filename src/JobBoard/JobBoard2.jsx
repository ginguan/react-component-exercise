import React, { useEffect, useState, useCallback } from "react";

const App = () => {
  const [jobIds, setJobIds] = useState([]); // Array to store job IDs
  const [jobs, setJobs] = useState({}); // Object to cache fetched job details
  const [visibleJobs, setVisibleJobs] = useState(6); // Number of jobs to display initially
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch job IDs on component mount
  useEffect(() => {
    const fetchJobIds = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        const data = await response.json();
        setJobIds(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job IDs:", error);
        setError("Failed to load job IDs.");
        setLoading(false);
      }
    };

    fetchJobIds();
  }, []);

  // Fetch job details when visibleJobs changes
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobIds.length === 0) return;

      const idsToFetch = jobIds
        .slice(0, visibleJobs)
        .filter((id) => !jobs[id]); // Only fetch jobs not already in cache

      if (idsToFetch.length === 0) return;

      setLoading(true);
      try {
        const jobDetailsArray = await Promise.all(
          idsToFetch.map(async (id) => {
            const response = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
            const data = await response.json();
            return { id, data };
          })
        );

        setJobs((prevJobs) => {
          const newJobs = { ...prevJobs };
          jobDetailsArray.forEach(({ id, data }) => {
            if (data) {
              newJobs[id] = data;
            }
          });
          return newJobs;
        });
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load some job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobIds, visibleJobs, jobs]);

  // Load more jobs
  const loadMoreJobs = useCallback(() => {
    setVisibleJobs((prevVisible) => prevVisible + 6);
  }, []);

  // Get the list of jobs to display
  const displayedJobs = jobIds.slice(0, visibleJobs).map((id) => jobs[id]).filter(Boolean);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Job Board</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading jobs...</p>}
      <ul>
        {displayedJobs.map((job) => (
          <li key={job.id} style={{ margin: "10px 0" }}>
            <a
              href={job.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "18px", color: "blue", textDecoration: "none" }}
            >
              {job.title || "No Title"}
            </a>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "gray" }}>
              Posted by {job.by} |{" "}
              {new Date(job.time * 1000).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      {visibleJobs < jobIds.length && (
        <button
          onClick={loadMoreJobs}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
