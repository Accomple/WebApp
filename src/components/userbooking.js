import React,{useState,useEffect} from 'react';
import "../assets/css/useraDashboard.css";
import img1 from "../assets/room_photos/Room.jpg"
import {Link} from 'react-router-dom'
import Loader from './loader.js'
import axios from 'axios';
import ROOT_URL from "../host";
const MyBooking=()=>{
const [data,setData]=useState(null);
const [loaded,setLoaded]=useState(false);

useEffect(()=>{
	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.get(`${ROOT_URL}/accounts/booking/get/user=me/`)
		.then((response)=>{
			console.log(response.data)
			setData(response.data)
			setLoaded(true);
		});
},[]);
	return(
		loaded?
		<>
		<div className="content-heading">Your Bookings</div>
		{
		data.exists?
		<div className="main-div">
			<div className="sec-1">
				<div className="sec-name">Booking Details</div>
				<div className="sec-row">
					<span className="sec-label">Booking No: </span>
					<span>{data.booking.booking_no}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Booking Date: </span>
					<span>{data.booking.booking_date}</span>
				</div>
			</div>
			<div className="sec-1">
				<div className="sec-name">Owner Details</div>
				<div className="sec-row">
					<span className="sec-label">Email: </span>
					<span>{data.owner.email}</span>
				</div>	
				<div className="sec-row">
					<span className="sec-label">Name: </span>
					<span>{data.owner.first_name} {data.owner.last_name}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Phone Number: </span>
					<span>{data.owner.phone_number}</span>
				</div>
			</div>
			<div className="sec-1">
				<div className="sec-name">Building Details</div>
				<div className="sec-row">
					<span className="sec-label">Building Name: </span>
					<span>{data.building.building_name}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Picture: </span>
					<span><img className="dis-pic" src={ROOT_URL+data.building.display_pic} alt="img"/></span>
				</div>	
				<div className="sec-row">
					<span className="sec-label">Area: </span>
					<span>{data.building.area}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Street: </span>
					<span>{data.building.street}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Landmark: </span>
					<span>{data.building.landmark}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">City: </span>
					<span>{data.building.city}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">State: </span>
					<span>{data.building.state}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Zip code: </span>
					<span>{data.building.zip_code}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">In time: </span>
					<span>{data.building.in_time}</span>
				</div>
			</div>
			<div className="sec-1">
				<div className="sec-name">Room Details</div>
				<div className="sec-row">
					<span className="sec-label">Title: </span>
					<span>{data.room.title}</span>
				</div>	
				<div className="sec-row">
					<span className="sec-label">Rent: </span>
					<span>{data.room.rent}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Total: </span>
					<span>{data.room.total}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Available: </span>
					<span>{data.room.available}</span>
				</div>
				<div className="sec-row">
					<span className="sec-label">Occupancy: </span>
					<span>{data.room.occupancy}</span>
				</div>

			</div>
			<div className="sec">
				<Link to={{
				pathname:'/user/cancelbookingprocess',
				aboutProps:{
					book_id:data.booking.booking_no
				}
				}} className="cust-button2" >CANCEL BOOKING</Link>
			</div>
			
		</div>
		:
		<div  className="status">
		No Bookings yet
		</div>
	}
		</>
		:
		<Loader/>
	);
}
export default MyBooking;