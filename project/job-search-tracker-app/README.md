# Job Search Tracker Application

* The project is Single Page Application about job search tracker. In the application, users can track the job information they applied easily and quickly.
* The application name is "JobtrackerXi"
* The application doesn't connected to database, so every time restarting the application, all data disappears.
* The application bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
* The appliction implemented CRUD RESTful API with Express and Node.js. Users can track, update, delete and add a new job they applied. 


## Getting Started

In order to run the application , you should run `npm install`  and then run `npm run server`. <br />

Open [http://localhost:5000](http://localhost:5000) to view the page in the browser.

### Login
* The user must provide a username to see the home page
* No need password
* Empty username is treated as a bad login

### Home Page
* After logging in, you can see the username in the header
* Displays five lists of all job applications groups by applied, interview, offer, rejected and others(has no classification) 
* Displays the total number of each classification
* The job information includes "job company" and "job title" 
* Clicking on a "company" title will load the details of the job search
* Clicking on a "delete" button delete the specific job
* Clicking on the "+ Add Job" button, the user can add a new job
* Clicking on the application name "JOBTRACKERXI" title, the user can go back home page
* Selecting the order, the user can sort the jobs by employer (alphabetically, both ascending and descending)
* THe user can scroll the job list if it cannot fit in the space available

### Logout 
* They will see the Login screen after logging out

### Job Details
* Displays the the basic information for the selected job
* The user can update the information of the selected job, and click "submit" to update the info
* The user can click "cancel" button without updating infomation and return the Home Page

### New Job
* Displays a form to enter the information for a new job, the "company" and "job title" input are required.
* The User is not allowed to add a job without entering the "company" and "job title" field.
* The user can submit the information by clicking "submit" button
* The user can click "cancel" button without adding new job and return the Home Page


## Authors

* **Xiaomin Xi** - Northeastern University


## License

This project is licensed under the MIT License


## Acknowledgments

* The logo image from https://www.lexisenglish.com/jobs-available-sunshine-coast-area-26-11-19/job-search-2/

