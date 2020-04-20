 import React, {useState, useEffect } from 'react';
 import JobList from './JobList';
 import Sort from './Sort';

 function JobsReview({ username, jobs, onRemoveJob, onShowJob }) {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [interviewingJobs, setInterviewingJobs] = useState([]);
    const [offerJobs, setOfferJobs] = useState([]);
    const[rejectedJobs, setRejectedJobs] = useState([]);
    const [unGroup, setUnGroup] = useState([]);
    const [order, setOrder] = useState('');


    const grouping = (jobs, order) => {
        switch(order) {
            case "ORDER_ASC":
                jobs.sort((job1, job2) => (job1.company > job2.company) ? 1 : -1);
                break;
            case "ORDER_DESC":
                jobs.sort((job1, job2) => (job2.company > job1.company) ? 1 : -1);
                break;
            default:
                break;
        }

        const applied = [], interview = [], offer = [], rejected=[], others =[];
        for( let job of jobs ) {
            switch(job.status) {
                case "applied":
                    applied.push(job);
                    break;
                case "interview":
                   interview.push(job);
                    break;
                case "offer":
                    offer.push(job);
                    break;
                case "rejected":
                    rejected.push(job);
                    break;
                default:
                    others.push(job);
                    break;
            }
        }

        setAppliedJobs(applied);
        setInterviewingJobs(interview);
        setOfferJobs(offer);
        setRejectedJobs(rejected);
        setUnGroup(others);
    };

    useEffect( () => {
        if(jobs) {
            grouping(jobs, order);
        }
    }, [jobs, order]);

    const onSort = (orderOption) => {
        setOrder(orderOption);
    }

    return (
        <div>
            <Sort onSort={onSort} />
            <div className="jobs-panel">
                <div>
                    <h4>APPLIED</h4>
                    <h5>{appliedJobs.length} JOBS</h5>
                    <JobList username={username} jobs={appliedJobs} onRemoveJob={onRemoveJob} onShowJob={onShowJob}/>
                </div>
                <div> 
                    <h4>INTERVIEW</h4>
                    <h5>{interviewingJobs.length} JOBS</h5>
                    <JobList username={username} jobs={interviewingJobs} onRemoveJob={onRemoveJob} onShowJob={onShowJob}/>
                </div>
                <div>
                    <h4>OFFER</h4>
                    <h5>{offerJobs.length} JOBS</h5>
                    <JobList username={username} jobs={offerJobs} onRemoveJob={onRemoveJob} onShowJob={onShowJob}/>
                </div>
                <div>
                    <h4>REJECTED</h4>
                    <h5>{rejectedJobs.length} JOBS</h5>
                    <JobList username={username} jobs={rejectedJobs} onRemoveJob={onRemoveJob} onShowJob={onShowJob}/>
                </div>
                <div>
                    <h4>OTHERS</h4>
                    <h5>{unGroup.length} JOBS</h5>
                    <JobList username={username} jobs={unGroup} onRemoveJob={onRemoveJob} onShowJob={onShowJob}/>
                </div>
            </div>
        </div>
    );
}

 export default JobsReview;