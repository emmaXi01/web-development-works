import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import JobForm from './JobForm';
import JobsReview from './JobsReview'
import Footer from '../Footer';
import errMessages from '../../messages';
import {fetchJobList, 
        fetchJob,
        addJob, 
        removeJob,
        updateJob} from '../../services';


function  JobTrackerApp({ username, onLogout }) {
    const [showJobList, setShowJobList] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [jobs, setJobs] = useState([]);  
    const [job, setJob] = useState({});

    const updateJobList = (username) => {
        fetchJobList(username)
        .then( (jobs) => {
            setJobs(jobs);
            setShowJobList(true);
        })
        .catch( err => {
            setErrorText(errMessages[err.errorCode]);
        })
    }; 
           
    useEffect( () => {
        if(username) {
            updateJobList(username);
        }     
    }, [username]);
    
    //show job application details
    const onShowJob = (username, jobId) => {
        fetchJob(username, jobId)
        .then( (job) => {
            setJob(job);
            setShowJobList(false);
        })
        .catch( err => {
            setErrorText(errMessages[err.errorCode]);
        })
    }

    //add a new job application
    const onAdd = (username, job) => {
        addJob(username, job)
        .then( () => {
           updateJobList(username);
        })
        .catch( err => {
            setErrorText(errMessages[err.errorCode]);
        });
    };

    //update a job
    const onUpdate = (username, jobId, job) => {
        updateJob(username, jobId, job)
        .then( () => {
            updateJobList(username);
            setJob({});
        })
        .catch( (err) => {
            setErrorText(errMessages[err.errorCode]);
        });
    };

    //remove a job application
    const onRemoveJob = (username, jobId) => {
        removeJob(username, jobId)
        .then( () => {
            updateJobList(username);
        })
        .catch( (err) => {
            setErrorText(errMessages[err.errorCode]);
        });
    };

    //back to home page
    const onBack = (username) => {
        updateJobList(username);
    }

    let content;
    if(showJobList) {
        content = <div>
                        <JobsReview username={username} 
                                    jobs={jobs} 
                                    onRemoveJob={onRemoveJob}
                                    onShowJob={onShowJob}/>
                        <div className="outgoing">
                            <button className="to-add-job" onClick={() => setShowJobList(false)}>+ Add Job</button>
                        </div>
                  </div> 
    } else {
        content = <JobForm username={username}
                           job={job}
                           onAdd={onAdd}
                           onUpdate={onUpdate}
                           onBack={onBack}/>
    }

    return(
        <div className="jobs-app">   
            <Nav username={username} onLogout={onLogout} onBack={onBack} />
            <div className="error">{errorText}</div>
            {content} 
            <Footer/>     
        </div>
    )
}

export default JobTrackerApp;
