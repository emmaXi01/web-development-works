"use strict";
const { v4: uuidv4 } = require('uuid');

const jobs = {};

const addJob = ({ username, job }) => {
    jobs[username] = jobs[username] || {};
    if(!job.company || !job.position || job.company.trim() === '' || job.position.trim() === '') {
        return;
    }

    const jobId = uuidv4();
    jobs[username][jobId] = { ...job, jobId};
    return jobs[username][jobId];
}

const readJob = ({ username, jobId }) => {
    if(!jobs[username] || !jobs[username][jobId]) {
        return;
    }
    return jobs[username][jobId];
}

const readAllBasicInfo = (username) => {
    if(!jobs[username]) {
        return [];
    }

    const jobsBasicInfo = [];
    const jobList = Object.values(jobs[username]);
    for( const id in jobList ) {
        const job = { 
            company: jobList[id].company, 
            position: jobList[id].position, 
            status: jobList[id].status,
            jobId: jobList[id].jobId,
        }
        jobsBasicInfo.push(job);
    }
    return jobsBasicInfo;
}

const updateJob = ({ username, jobId, job }) => {
    if(!jobs[username] || !jobs[username][jobId]) {
        return;
    }

    jobs[username][jobId] = { ... job, jobId};
    return jobs[username][jobId];
}

const removeJob = ({ username, jobId }) => {
    if(!jobs[username]) {
        return;
    }

    const job = jobs[username][jobId];
    delete jobs[username][jobId];
    return job;
}

module.exports = {
    addJob,
    readJob,
    readAllBasicInfo,
    updateJob,
    removeJob
}