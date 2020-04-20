const users = require('../users');
const jobs = require('../jobs');

const routes = {
    session: {},
    jobs: {
        one: {},
        all: {},
    },
};

/* session */
routes.session.status = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    const user = users.getUser(uid);
    res.status(200).json(user);
};

//login
routes.session.create = (req, res) => {
    const username = req.body.username;
    const user = users.createUser(username);
    
    if(!user) {
        res.status(403).json({ errorCode: 'login_denied' });
        return;
    }

    res.cookie('uid', user.uid, { MaxAge: 1000 * 60 });
    res.status(200).json(user);
};

//logout
routes.session.delete = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    res.clearCookie('uid');
    users.removeUser(uid);
    res.sendStatus(200);
};

/* jobs */
//get the list of job applications info
routes.jobs.all.read = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ uid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'action_not_permitted' });
        return;
    }

    const jobsbasicInfo = jobs.readAllBasicInfo(username);
    res.status(200).json(jobsbasicInfo);
};

//get the details of one job
routes.jobs.one.read = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ uid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'action_not_permitted' });
        return;
    }

    const jobId = req.params.jobId;
    const job = jobs.readJob({ username, jobId });
    if(!job) {
        res.status(404).json({ errorCode: 'no_such_taskId' });
        return;
    }

    res.status(200).json(job);
};

//add a new job application
routes.jobs.one.add = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ uid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'action_not_permitted' });
        return;
    }

    const job = req.body.job;
    const newJob = jobs.addJob({ username, job });
    if(!newJob) {
        res.status(400).json({ errorCode: 'missing_text' });
        return;
    }
    res.status(200).json(newJob);
};

//update one job application
routes.jobs.one.update = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ uid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'action_not_permitted' });
        return;
    }

    const jobId = req.params.jobId;
    const job = req.body.job;

    const newJob = jobs.updateJob({ username, jobId, job });
    if(!newJob) {
        res.status(400).json({ errorCode: 'failed_to_update' });
        return;
    }
    res.status(200).json(newJob);
};

//remove one job application
routes.jobs.one.delete = (req, res) => {
    const uid = req.cookies.uid;
    const isValidSession = users.isValidSession(uid);
    if(!isValidSession) {
        res.clearCookie('uid');
        res.status(401).json({ errorCode: 'no_valid_session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ uid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'action_not_permitted' });
        return;
    }

    const jobId = req.params.jobId;
    const job = jobs.removeJob({ username, jobId });
    if(!job) {
        res.status(404).json({ errorCode: 'no_such_taskId' });
        return;
    }

    res.sendStatus(200);
};

module.exports = routes;