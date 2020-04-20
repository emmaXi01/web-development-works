import React, { useMemo } from 'react';
import Job from './Job';

function JobList({ username, jobs, onRemoveJob, onShowJob }) {

    const jobList = useMemo(()=>{
        return jobs.map( job => 
        <Job key={job.jobId}     
              job={job} 
              username={username} 
              onRemoveJob={onRemoveJob}
              onShowJob={onShowJob} />
    )}, [jobs, onRemoveJob, username, onShowJob]);

    return(
        <ul className="job-list">
            {jobList}
        </ul>  
    );
};

export default JobList;