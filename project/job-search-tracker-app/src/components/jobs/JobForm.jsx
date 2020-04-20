import React, { useState, useEffect }  from 'react';
import options from '../../options';



function JobForm ({ username, job, onAdd, onUpdate, onBack }) { 
    const [company, setCompany] = useState(job.company);
    const [position, setPosition] = useState(job.position);
    const [status, setStatus] = useState(job.status);
    const [appliedDate, setAppliedDate] = useState(job.appliedDate);
    const [interview1Date, setInterview1Date] = useState(job.interview1Date);
    const [interview2Date, setInterview2Date] = useState(job.interview2Date);
    const [offerDate, setOfferDate] = useState(job.offerDate);
    const [url, setUrl] = useState(job.url);
    const [location, setLocation] = useState(job.location);
    const[description, setDescription] = useState(job.description);
   
    const submitJob = (event) => {
        event.preventDefault();
        const newJob = { company: company,
                         position: position,
                         status: status,
                         appliedDate: appliedDate,
                         interview1Date: interview1Date,
                         interview2Date: interview2Date,
                         offerDate: offerDate,
                         url: url,
                         location: location,
                         description: description,
        }
      
        if(Object.keys(job).length === 0 && job.constructor === Object) {
            onAdd(username, newJob); 
        } else {   
           onUpdate(username, job.jobId, newJob)
        }    
    }

    const back = () => {
        onBack(username)
    }

    return (
        <div className="job-form">    
            <form onSubmit={submitJob}>
                <h2 className="title">Job Info</h2>   
                <div className="job-basic-info">
                    <div>
                        <p>Company*: </p>
                        <input className="job-company" type="text" 
                            onChange={(e)=>{setCompany(e.target.value)}} value={company} required/>
                    </div>
                    <div>
                        <p> Job title*: </p>
                        <input className="job-position" type="text" 
                            onChange={(e)=>{setPosition(e.target.value)}} value={position} required/>
                    </div>    
                    <div>
                        <p>Status: 
                        <select className="options" onChange={(e)=>{setStatus(e.target.value)}} value={status}>
                            { options.map((item, index) => 
                                <option key={index} value={item}>
                                    {item}
                                </option>) }
                        </select></p>
                    </div>
                </div>
                <div className="log-dates"> 
                    <div>
                        <p>Applied date: </p>
                        <input type="date"  className="applicated-date" 
                            onChange={(e)=>{setAppliedDate(e.target.value)}} value={appliedDate}/>
                    </div>
                    <div>
                        <p>Interview1 date: </p>
                        <input type="date" className="interview1-date" 
                            onChange={(e)=>{setInterview1Date(e.target.value)}} value={interview1Date}/>
                    </div>
                    <div>
                        <p>Interview2 date: </p>
                        <input type="date"  className="interview2-date" 
                            onChange={(e)=>{setInterview2Date(e.target.value)}} value={interview2Date}/>
                    </div>
                    <div>
                        <p>Offer date: </p>
                        <input type="date" className="offer-date" 
                            onChange={(e)=>{setOfferDate(e.target.value)}} value={offerDate}/>
                    </div>
                    <div>
                        <p>Post URL: </p>
                        <input className="url" type="text" placehold="+ add URL" 
                            onChange={(e)=>{setUrl(e.target.value)}} value={url}/>
                    </div>
                    <div>
                        <p>Location: </p>
                        <input className="location" type="text" placehold="+ add location" 
                            onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                    </div>
                </div>
                <div>
                    <p>Description: </p>
                    <textarea className="description" rows="4" cols="100" 
                            onChange={(e)=>{setDescription(e.target.value)}} value={description}></textarea>
                </div> 

                <div>
                    <input className="submit" type="submit" value="Submit" />
                </div> 
            </form> 
            <div className="back-home">
                <button className="to-back-home" onClick={back}>Cancel</button>
            </div>       
        </div>
    )
};

export default JobForm;