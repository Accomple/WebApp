import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import "../assets/css/ownerdashboard.css";
import axios from 'axios';
import Loader from './loader';
import ROOT_URL from "../host";
const Booking=(data)=>{
	let props=data.bookData;
	return(
			<div className="booking">
				<div className="booking-data">
					<div className="detail-row">
						<span className="booking-label">Booking number: </span><span>{props.booking_no}</span>
					</div>
					<div className="detail-row">
						<span className="booking-label">User: </span><span>{props.user}</span>
					</div>
					<div className="detail-row">
						<span className="booking-label">Name: </span><span>{props.first_name} {props.last_name}</span>
					</div>
					<div className="detail-row">
						<span className="booking-label">Contact Detail:</span><span>{props.phone_number}</span>
					</div>
					<div className="detail-row">
						<span className="booking-label">Booking Time:</span><span>{props.booking_date}</span>
					</div>
				</div>
				<div className="options">
					<Link className="cust-button2"to={{
				pathname:'/owner/cancelbookingprocess',
				aboutProps:{
					book_id:props.booking_no,
					room_id:data.roomid
				}
			}}>CANCEL BOOKING</Link>
				</div>
			</div>
		);
}
const ActiveBooking=(props)=>{
const id=props.match.params.id;
const [data,setData]=useState([]);
const [loaded,setLoaded]=useState(false);
useEffect(()=>{
	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.get(`${ROOT_URL}/accommodations/room/get/id${"%3D"+id}/`)
		.then((response)=>{
			console.log(response.data)
			setData(response.data.bookings)
			setLoaded(true);
		});
},[])


	return(
		<>
		<div className="content-heading">Active Bookings</div>
		{loaded ?
		<div className="active-booking-list">
			{
				data.length===0?
				<div className="status">No active bookings yet</div>
				:
				null
			}
			{
				data.map((object)=>{return(<Booking roomid={id} bookData={object}/> ) })
			}
		</div>
		:
		<Loader/>
		}
		</>

	);
}
export default ActiveBooking