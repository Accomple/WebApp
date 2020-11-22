import React,{useState,useEffect} from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import ROOT_URL from "../host";

const CancelBookingProcessOwner=(props)=>{
const [loaded,setLoaded]=useState(false);

useEffect(()=>{
	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.delete(`${ROOT_URL}/accommodations/booking/delete/id${"%3D"+props.location.aboutProps.book_id}/`)
		.then((response)=>{
			console.log(response.data)
			setLoaded(true);
		})
	
	console.log(props.location.aboutProps.book_id)
},[])


return(
	!loaded ?
	<div className="status">Cancelation in progress.......</div>
	:
	<Redirect to= {`/owner/activebookings/${props.location.aboutProps.room_id}`} />
	);

}
export default CancelBookingProcessOwner;