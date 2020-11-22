import React,{useEffect,useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import "../assets/css/loginPage.css";
import Spinner from 'react-bootstrap/Spinner';
import {Redirect} from 'react-router-dom';
import ROOT_URL from "../host";
const AddBuildings=()=>{

	

const handleLocationChange=()=>{
	console.log("working");
}


const [formProgress,setFormProgress]=useState(1);
const [submitData,setSubmitdata]=useState(false);
const [city,setCity]=useState("");
const [street,setStreet]=useState("");
const [landmark,setLandmark]=useState("");
const [zipCode,setZipCode]=useState("");
const [area,setArea]=useState("")
const [lat,setlat]=useState(null);
const [lng,setlng]=useState(null);
const [state,setState]=useState("");
const [file,setFile]=useState(null);
const [fileSizeError,setfileSizeError]=useState(false);
const [perks,addPerks]=useState([]);
const [perkField,setPerkField]=useState();
const [buildingId,setBuildingId]=useState(null);
const [formdata,setFormData]=useState(null);
const [caption,setCaption]=useState("");
const uploadedImage = React.useRef(null);
const imageUploader = React.useRef(null);
const [loading,setLoading]=useState(false);
const [finalSubmit,setfinalSubmit]=useState(false);

useEffect(()=>{
  
	const temp=formdata;
	if(formdata)
	{
		
		temp.append("street",street);
		temp.append("city",city);
		temp.append("state",state);
		temp.append("zip_code",zipCode);
		temp.append("landmark",landmark);
		temp.append("latitude",lat);
		temp.append("longitude",lng);
		temp.append("area",area);

		console.log(Object.fromEntries(temp))	
	}

	console.log("toke:")	
	console.log(localStorage.getItem("token"));
	if(submitData)
	{
    setLoading(true);
		axios.post(`${ROOT_URL}/accommodations/building/add/`,temp,{
    	headers: {
      		'Content-Type': 'multipart/form-data',
      		'Authorization': `Token ${localStorage.getItem('token')}`
    	}})
    	.then((response)=>{
        	console.log(response.data)
        	setBuildingId(response.data.id);
          setLoading(false);	
        	setFormProgress(4);
      	}
   		)
	}
},[submitData])


useEffect(()=>{
    if(file!=null&&file.size>500000)
        setfileSizeError(true);
    else
        setfileSizeError(false);
},[file]);


const addPerksToArrray=(event)=>{
	const temp=perks;
	console.log("add:"+perkField)
	temp.push(perkField)
	addPerks(temp);
	setPerkField("");
}

const submitHandlerAddress=(event)=>{
	event.preventDefault()
  setLoading(true)
	axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+area+"+"+landmark+"+"+street+"+"+city+",+"+state+"+"+zipCode+"&key=AIzaSyC3Z1BJHsA3nuLp2ttSbZwrZmAPDJnZcBM")
	.then((response)=>{
		console.log(response.data.results[0].geometry.location);
		setlat(response.data.results[0].geometry.location.lat)
		setlng(response.data.results[0].geometry.location.lng)
		
		setSubmitdata(true);

	}
	
	);	
}


const fsubmitData=(e)=>{
  e.preventDefault();
  setfinalSubmit(true);
}

const addPhotoHandler=(e)=>{
	console.log(file);
	console.log(caption)
	setCaption("");
	const temp=new FormData();
  setLoading(true);
	temp.append("photo",file);
	temp.append("caption",caption);
	axios.post(`${ROOT_URL}/accommodations/photo/add/building_id${"%3D"+buildingId}/`,temp,{
    	headers: {
      		'Content-Type': 'multipart/form-data',
      		'Authorization': `Token ${localStorage.getItem('token')}`
    	}})
    	.then((response)=>{
        	console.log(response.data)
          setLoading(false);
        	//setBuildingId(response.data.id);	
      	})

}
const submitHandlerRegister=(e)=>{
	e.preventDefault();
	setFormData(new FormData(e.target));
	setFormProgress(2);
}
const submitDisplayPic=(e)=>{
	e.preventDefault();
	 if(file)
      {

      console.log("working"+file.name);  
      let temp= formdata;
      temp.append('display_pic',file,file.name)
      setFormData(temp)
      console.log(Object.fromEntries(temp))
  	}	
  	
	setFormProgress(3);
}
const perksSubmitHandler=e=>{
	e.preventDefault();
	//const temp=new FormData();
	//perks.map((e)=>{temp.append("perks",e)});
	//temp.append("perks",JSON.stringify(perks));
	//console.log("perks submission:"+Object.fromEntries(temp))
  setLoading(true)
	let json=perks;
	let post_data={perks:json}
	console.log(json);
	console.log(post_data);
	
	axios.post(`${ROOT_URL}/accommodations/perks/add/building_id${"%3D"+buildingId}/`,post_data,{
    	headers: {
      		'Authorization': `Token ${localStorage.getItem('token')}`
    	}})
    	.then((response)=>{
        	console.log("perksREsponse:"+response.data)
          setLoading(false)
        	setFormProgress(5);
        	//setBuildingId(response.data.id);	
      	})
    

}
const handleImageUpload = e =>{
    const [file] = e.target.files;
    setFile(file);
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
          current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
};


	return(
    !finalSubmit?
		<div className="Form3">
		{
			formProgress==1?
			<div className="Form-content">
				<h3 className="step-name">Register Building</h3>
				<Form onSubmit={submitHandlerRegister} >
					<Form.Group  controlId="formsStreet">
      					<Form.Label>Building Name</Form.Label>
      					<Form.Control placeholder="Building Name"  name="building_name"/>
    				</Form.Group>
    				<Form.Group id="formGridCsheckbox">
    					<Form.Label style={{'padding-right':'10px'}}>Open for</Form.Label>	
    					<Form.Row >
    						<Form.Check style={{'padding-right':'10px','padding-left':'25px'}}type="radio" value="M" label="Male" name="gender_label" />
    						<Form.Check style={{'padding-right':'10px'}}type="radio" value="F" label="Female" name="gender_label" />
    						<Form.Check style={{'padding-right':'10px'}}type="radio" value="U" label="Unisex" name="gender_label" />
    					</Form.Row>
  					</Form.Group>
  					<Form.Group  controlId="formsStreet">
      					<Form.Label>In Time</Form.Label>
      					<Form.Control type="time" name="in_time"/>
    				</Form.Group>
  					<Button className="cust-button" type="submit" >
   				 		Next
 					</Button>
				</Form>
			</div>:null
		}
		{
			formProgress==2?
			<div className="Form-content">
				<h3 className="step-name">Add Display Picture</h3>
				<Form onSubmit={submitDisplayPic} >
					<div
     					style={{
        						display: "flex",
        						flexDirection: "column",
        						alignItems: "center",
        						justifyContent: "center"
      							}}
    				> 
      					<input
        					type="file"
        					accept="image/*"
        					onChange={handleImageUpload}
        					ref={imageUploader}
        					style={{
          						display: "none"
        						}}
      					/>
      				<div
        				style={{
          						height: "300px",
          						width: "400px",
          						border: "0px solid black",
          						}}
        				onClick={() => imageUploader.current.click()}
      				>
       					<img
         					ref={uploadedImage}
          					style={{
            				width: "400px",
            				height: "300px",
            				position: "absolute",
           					'border-radius':"0.25rem",
            				border: "3px solid black"
          					}}
        				/>
      				</div>
      					<span>
      						Click to upload Image
    			  		</span>
      					{fileSizeError ? <span className="error-text">file size must be less than 500KB</span>:null}
     			</div>
  				<Button className="cust-button" disabled={fileSizeError} type="submit" >
   				 	Next
 				</Button>
				</Form>
			</div>:null
		}
		
		{
			formProgress==3?
			<div className="Form-content">
				<h3 className="step-name">Enter Address</h3>
				<Form onSubmit={submitHandlerAddress} >
				<Form.Group  controlId="formsStreet">
      				<Form.Label>Street</Form.Label>
      				<Form.Control placeholder="Street" onChange={(e)=>setStreet(e.target.value)} name="street"/>
    			</Form.Group>
    			<Form.Group  controlId="formArea">
      				<Form.Label>Area</Form.Label>
      				<Form.Control placeholder="Area" onChange={(e)=>setArea(e.target.value)} name="zip"/>
    			</Form.Group>
    			<Form.Group  controlId="formsLandmark">
      				<Form.Label>Landmark</Form.Label>
      				<Form.Control placeholder="Landmark" onChange={(e)=>setLandmark(e.target.value)} name="landmark"/>
    			</Form.Group>
    			<Form.Group  controlId="formsCity">
      				<Form.Label>city</Form.Label>
      				<Form.Control placeholder="city" onChange={(e)=>setCity(e.target.value)} name="city"/>
    			</Form.Group>
    			<Form.Group  controlId="formsState">
      				<Form.Label>state</Form.Label>
      				<Form.Control placeholder="state" onChange={(e)=>setState(e.target.value)} name="street"/>
    			</Form.Group>
    			<Form.Group  controlId="formsZip">
      				<Form.Label>Zip</Form.Label>
      				<Form.Control placeholder="zipcode" onChange={(e)=>setZipCode(e.target.value)} name="zip"/>
    			</Form.Group>
  				<Button className="cust-button" type="submit" disabled={loading}>
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
		{
			formProgress==4?
			<div className="Form-content" onSubmit={perksSubmitHandler}>
				<h3 className="step-name">Add Perks</h3>
				<Form >
				<Form.Group  controlId="formsPerks">
      				<Form.Label>Enter Perk</Form.Label>
      				<Form.Control placeholder="Enter facility to add" onChange={(e)=>setPerkField(e.target.value)} value={perkField} name="perkField"/>
    			</Form.Group>
    			<Button className="cust-button" onClick={addPerksToArrray}>Add</Button>
  				
				<div>
					<h5>Perks added</h5>
					{
						perks.length==0?
						<div>No perks added</div>
						:
						<div>
							<ul>
								{
									//console.log(perks)
									perks.map((obj)=>{return <li>{obj}</li>})
								}
							</ul>
						</div>
					}
				</div>
				<Button className="cust-button" type="submit" disabled={loading}>
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
			formProgress==5?
			<div className="Form-content">
				<h3 className="step-name">Add Some Photos</h3>
				<Form onSubmit={fsubmitData} >
					<div
     					style={{
        						display: "flex",
        						flexDirection: "column",
        						alignItems: "center",
        						justifyContent: "center"
      							}}
    				> 
      					<input
        					type="file"
        					accept="image/*"
        					onChange={handleImageUpload}
        					ref={imageUploader}
        					style={{
          						display: "none"
        						}}
      					/>
      				<div
        				style={{
          						height: "300px",
          						width: "400px",
          						border: "0px solid black",
          						}}
        				onClick={() => imageUploader.current.click()}
      				>
       					<img
         					ref={uploadedImage}
          					style={{
            				width: "400px",
            				height: "300px",
            				position: "absolute",
           					'border-radius':"0.25rem",
            				border: "3px solid black"
          					}}
        				/>
      				</div>
      					<span>
      						Click to upload Image
    			  		</span>
      					{fileSizeError ? <span className="error-text">file size must be less than 500KB</span>:null}

     			</div>
     			<Form.Group  controlId="formsZip">
      				<Form.Label>Caption</Form.Label>
      				<Form.Control placeholder="Enter caption for photo" value={caption} onChange={(e)=>setCaption(e.target.value)} name="zip"/>
    			</Form.Group>
     			
        <Button className="cust-button" onClick={addPhotoHandler}  disabled={loading||fileSizeError}>
                  {
        !loading ?
        <span>Upload</span>
        :
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
    />}
         </Button>
  				<Button className="cust-button" type="submit" disabled={loading}>
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
    <Redirect to="/owner/dashboard"/>
	);
}

export default AddBuildings;