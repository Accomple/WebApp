import React,{useState,useEffect} from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import ROOT_URL from "../host";
//import OTPInput,{ ResendOTP } from 'otp-input-react';

const BookingProcess=(props)=>{
const [loaded,setLoaded]=useState(false);

useEffect(()=>{
	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.post(`${ROOT_URL}/accommodations/booking/add/id${"%3D"+props.location.aboutProps.room_id}/`)
		.then((response)=>{
			console.log(response.data)
			setLoaded(true);
		})
	
	console.log(props.location.aboutProps.room_id)
},[])


return(
	!loaded ?
	<div className="status">Booking your room.............</div>
	:
	<Redirect to= "/user/mybookings" />
	);

}
export default BookingProcess;