import React,{useEffect,useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import "../assets/css/loginPage.css";
import {Redirect} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ROOT_URL from "../host";

const AddRoom=(props)=>{
const id=props.match.params.id;
const [file,setFile]=useState(null);
const [filesizeerro,setFilesizeerror]=useState(false);
const [submited,setSubmit]=useState(false);
const [progress,setProgress]=useState(1);
const [roomid,setroomid]=useState(-1);
const [loading,setloading]=useState(false);

const fileChangeHandler=(e)=>{
  const [file] = e.target.files;
    setFile(file);
}
useEffect(()=>{
    if(file!=null&&file.size>1000000)
        setFilesizeerror(true);
    else
        setFilesizeerror(false);
},[file]);


	const submitHandler=(e)=>{
		e.preventDefault();
    setloading(true);
		const formdata=new FormData(e.target);
		console.log(Object.fromEntries(formdata))
		axios.post(`${ROOT_URL}/accommodations/room/add/building_id${"%3D"+id}/`,formdata,{
    	headers: {
      		'Content-Type': 'multipart/form-data',
      		'Authorization': `Token ${localStorage.getItem('token')}`
    	}})
    	.then((response)=>{
        	console.log(response.data)
        	//setBuildingId(response.data.id);
        	setroomid(response.data.id)	
          setloading(false);
        	setProgress(2);
      	})
	}
const documentHandler=(e)=>{
	e.preventDefault();
	const  formdata=new FormData(e.target);
	console.log(Object.fromEntries(formdata))
  setloading(true);
	axios.post(`${ROOT_URL}/accommodations/property_deed/add/room_id${"%3D"+roomid}/`,formdata,{
    	headers: {
      		'Content-Type': 'multipart/form-data',
      		'Authorization': `Token ${localStorage.getItem('token')}`
    	}})
    	.then((response)=>{
        	console.log(response.data)
          setloading(false);
        	setSubmit(true)
        	//setBuildingId(response.data.id);
      	})
}

	return(

		!submited ?
		<div className="Form3">
		{
			progress==1?
		<div className="Form-content">
				<h3 className="step-name">Enter Room Details</h3>
				<Form onSubmit={submitHandler} >
				<Form.Group  controlId="formsStreet">
      				<Form.Label>Title</Form.Label>
      				<Form.Control placeholder="Room Title"  name="title"/>
    			</Form.Group>
    			<Form.Group  controlId="formArea">
      				<Form.Label>Rent</Form.Label>
      				<Form.Control placeholder="Area"  name="rent"/>
    			</Form.Group>
    			<Form.Group  controlId="formsLandmark">
      				<Form.Label>Description</Form.Label>
      				<Form.Control placeholder="Contact number"  name="description"/>
    			</Form.Group>
    			<Form.Group  controlId="formsCity">
      				<Form.Label>Total</Form.Label>
      				<Form.Control placeholder="total availability"  name="total"/>
    			</Form.Group>
    			<Form.Group  controlId="formsState">
      				<Form.Label>Occupancy</Form.Label>
      				<Form.Control placeholder="occupied beds"  name="occupancy"/>
    			</Form.Group>
  				<Button  className="cust-button" type="submit" disabled={loading}>
      {
        !loading ?
        <span>Next</span>
        :
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
    />}
    </Button>
 				 </Form>
 		</div>:null
 		}
 		{
 			progress==2?
 			<div className="Form-content">
				<h3 className="step-name">Add Property deeds</h3>
				<Form onSubmit={documentHandler} >
				<Form.Group  controlId="formsStreet">
      				<Form.Label>Registration no</Form.Label>
      				<Form.Control placeholder="reg no"  name="registration_no"/>
    			</Form.Group>
    			<Form.Group  controlId="formArea">
      				<Form.Label>Issue date</Form.Label>
      				<Form.Control type="date" name="issue_date"/>
    			</Form.Group>
    			<Form.Group  controlId="formsLandmark">
      				<Form.Label>Expiry date</Form.Label>
      				<Form.Control placeholder="Contact number" type="date"  name="expiry_date"/>
    			</Form.Group>
    			<Form.Group  controlId="formsCity">
      				<Form.Label>Document</Form.Label>
      				<div>
      				<input
        					type="file"
        					accept=".pdf,image/*"
        					name="document"
                  onChange={fileChangeHandler}
      					/>
      				</div>
              {filesizeerro ? <span className="error-text">file size must be less than 1000KB</span>:null}
    			</Form.Group>
  				<Button  className="cust-button" type="submit" disabled={loading||filesizeerro}>
      {
        !loading ?
        <span>Submit</span>
        :
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
    />}
    </Button>
 				 </Form>
 		</div>:null
 		}
 		</div>
 		:
 		<Redirect to={"/owner/buildingdetails/"+id}/>
		);
}
export default AddRoom;