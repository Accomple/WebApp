
//import OTPInput,{ ResendOTP } from 'otp-input-react';
import React,{useState,useEffect} from 'react';
import "../assets/css/loginPage.css";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ROOT_URL from "../host";
import axios from "axios"
import {Redirect} from 'react-router-dom'

function OtpVerification() {
const [success,setSuccess]=useState(false);
const [isLoading,setLoading]=useState(false);
const [otp,setOtp]=useState("");
const [error,setError]=useState(false);
//const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(0);
    const [seconds, setSeconds ] =  useState(15);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

  const VerifyClickHandler=(event)=>{
  	let form={};
  	form.otp=otp;
  	console.log("verify")
  	setLoading(true)
  	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.post(`${ROOT_URL}/accounts/verification_code/`,form)
		.then((response)=>{
			console.log(response.data)
			setSuccess(true);
			//setRooms(response.data)
			setLoading(false)
		}).catch(
			(error)=>{
				setLoading(false);
				console.log(error.response)
				setError(true);
			})
  }
  const ResendClickHandler=(event)=>{
  	let form={};
  	form.resend=true;
  	setLoading(true)
  	console.log("Resend")
  		const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.post(`${ROOT_URL}/accounts/verification_code/`,form)
		.then((response)=>{
			console.log(response.data)
			setLoading(false)
			setSeconds(15)
			//setRooms(response.data)
			//setResponseLoaded(true)
		}).catch(
      		(error)=>{
        	setLoading(false);
        	//setError(true);
        	console.log(error.response);  
      }
    );
  }
  return (
  	!success ?
  	<div className="otp">	
  	<span>We have sent you One Time Password to your email</span>
  	{ error ?<div className="error-text">Invalid OTP</div>: null}
  	<input className="otp-input" onChange={(e)=>{setOtp(e.target.value)}} maxlength={6} placeholder="Please Enter OTP"/>
  	<Button  className="cust-button" onClick={VerifyClickHandler} disabled={isLoading}>
      {
        !isLoading ?
        <span>Verify</span>
        :
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
    />}
    </Button>
    <div>
    <div>{ minutes === 0 && seconds === 0
            ? <>Did not recived OTP?</>
            : <>Resend OTP in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</> 
        }</div>
    <Button  className="cust-button" onClick={ResendClickHandler} disabled={!(minutes === 0 && seconds === 0)}>
      {
        !isLoading ?
        <span>Resend</span>
        :
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
    />}
    </Button>
    </div>
  	</div>
  	:
  	<Redirect to="/"/>
  );
}
export default OtpVerification;