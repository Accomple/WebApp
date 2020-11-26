import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../assets/css/loginPage.css";
import ROOT_URL from "../host";
import {Redirect} from "react-router-dom";

const Signup=(props)=>{
    const [pass1,setPass1]=useState("");
    const [pass2,setPass2]=useState("");
    const [email,setEmail]=useState("");
    const [authenticate,setAuthenticate]=useState(false);
    const [file,setFile]=useState(null);
    const [fileSizeError,setfileSizeError]=useState(false);
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const loginHandler=props.changeState;
    const [passEqual,setpassEqual]=useState(true)
    const [success,setSuccess]=useState(false);

    useEffect(()=>{
    
      if(file!=null&&file.size>500000)
        setfileSizeError(true);
      else
        setfileSizeError(false);
      if(pass1!=pass2)
        setpassEqual(false)
      else
        setpassEqual(true);
    },[pass2,pass1,file]);

    const submitHandler=(event)=>{
      event.preventDefault();
      console.log(event.target.files);  
     // const [file] = event.target.profile_pic.files;
      const data = new FormData(event.target);
      if(file)
      {
      console.log("working"+file.name);
      
      let name=data.get('first_name')+'.jpg';
      data.set('profile_pic',file,file.name)

      }
      else
      {
        data.set('profile_pic',null)
      }
      if(data.get('is_owner')==="on")
      {
          data.set('is_owner',true)
      }else
      {
          data.set('is_owner',false)
      }
      console.log((Object.fromEntries(data)));
      
   axios.post(`${ROOT_URL}/accounts/register/`,data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then(
      (response)=>{
          //console.log(response.data)
       
        setAuthenticate(true)
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("loggedIn",true);
        localStorage.setItem("email",email);
        loginHandler(true);

        setSuccess(true);
      }
    )
    .catch(
      (error)=>{
        //this.setState({error:error.response})
        console.log(error)
      }
    )
  
    }

    
   const handleImageUpload = e => {
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
    !success ?
  <div className="wrapper">  
<div className="login-form2">
  <Form name="myform" onSubmit={submitHandler}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    > <div className="Signup">
      <h1>Sign Up</h1>
      </div>
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
          height: "100px",
          width: "100px",
          border: "0px solid black",
          
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "100px",
            height: "100px",
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
  
    <Form.Group  controlId="formGrsidEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} name="username" />
    </Form.Group>
  <Form.Row> 
    <Form.Group as={Col} controlId="formGriadPassword">
      <Form.Label>First Name</Form.Label>
      <Form.Control placeholder="First Name" name="first_name" />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridsPassword" >
      <Form.Label>Last Name</Form.Label>
      <Form.Control placeholder="Last Name" name="last_name" />
    </Form.Group>
  </Form.Row>
  <Form.Row> 
    <Form.Group as={Col} controlId="formGridaPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPass1(e.target.value);}}/>
    </Form.Group>
    <Form.Group as={Col} controlId="formGriddPassword">
      <Form.Label>Repeat Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass2(e.target.value);}} />
      {
        passEqual ? null:<div className="error-text">Password did not match</div>
      }
    </Form.Group>
      
  </Form.Row>
  <Form.Row>
  <Form.Group  as={Col}controlId="formGridqEmail">
      <Form.Label>Date</Form.Label>
      <Form.Control type="date" placeholder="Enter date" name="date_of_birth" />
    </Form.Group>
  <Form.Group as={Col} controlId="formsGridEmail">
      <Form.Label>Contact number</Form.Label>
      <Form.Control placeholder="Contact Number" name="phone_number"/>
    </Form.Group>
  </Form.Row>
  <Form.Group id="formGridCsheckbox">
    <Form.Check type="checkbox" label="Are you owner?" name="is_owner" />
  </Form.Group>

  <Button className="cust-button" disabled={ fileSizeError||!passEqual}type="submit" >
    Submit
  </Button>
</Form>
</div>
</div>
:
<Redirect to="/otpverification" />
    );
}
export default Signup;