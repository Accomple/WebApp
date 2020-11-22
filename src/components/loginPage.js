import React,{useState} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {Redirect,Link} from 'react-router-dom'
import ROOT_URL from "../host";
import "../assets/css/loginPage.css";
const LoginPage=(props)=>{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [isLoading,setLoading]=useState(false);
const [error,setError]=useState(false);
const [authenticate,setAuthenticate]=useState(false);
const [token,settoken]=useState("");
const loginHandler=props.changeState;
const submitHandler=(event)=>{
  console.log(email+password);
  event.preventDefault();

  let form={}
    form.username=email;
    form.password=password;
    setLoading(true);
    axios.post(`${ROOT_URL}/accounts/login/`,form)
    .then(
      (response)=>{
        setLoading(false);
        setError(false);
        setAuthenticate(true);
        console.log(response.data)
        settoken(response.data.token);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("loggedIn",true);
        localStorage.setItem("email",email);
        localStorage.setItem("is_owner",response.data.is_owner)

        loginHandler(true);

      }
    )
    .catch(
      (error)=>{
        setLoading(false);
        setError(true);
        console.log(error.response.data.detail);  
      }
    )
}

return(
!authenticate?
<div className="wrapper">  
<div className="login-form">
  <h2>Login</h2>
  <Form onSubmit={submitHandler}>
    <Form.Group controlId="formBasicEmail" >
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange ={e=>setEmail(e.target.value)}  />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password} />
    </Form.Group>
    { error ?<div className="error-text">Invalid Email address or password</div>: null}

    <div className="signlink"><Link to="/signup">New user?Sign In</Link></div>
    <Button  className="cust-button" type="submit" disabled={isLoading}>
      {
        !isLoading ?
        <span>Login</span>
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
</div>
</div>
:
<Redirect to="/"/>
);
}
export default LoginPage;