import React from 'react';

function Job({ username, job, onRemoveJob, onShowJob }) {
    const showJob = (e) => {
        const jobId = e.target.dataset.jobId;
        onShowJob(username, jobId);
    }

    const removeJob = (e) => {
        const jobId = e.target.dataset.jobId;
        onRemoveJob(username, jobId);
    }

    return(
        <li className="job">
            <span data-job-id={job.jobId} 
                    className="company"
                    onClick={showJob}>{job.company}</span>
            <span data-job-id={job.jobId} 
                    className="position">{job.position}</span>
            <button data-job-id={job.jobId} 
                    className="to-remove-job"
                    onClick={removeJob}>delete</button>      
        </li>      
    );
};

export default Job;