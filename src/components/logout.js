import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import ROOT_URL from "../host";

const Logout=(props)=>{
	const[loggedout,setLoggedout]=useState(false);
	const logoutHandler=props.changeState;
	useEffect(()=>{
		const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.get(`${ROOT_URL}/accounts/logout/`).then((response)=>{setLoggedout(true);logoutHandler(false)})
		localStorage.removeItem('token');
		localStorage.removeItem('loggedIn');
		
	},[])

	return(
		!loggedout ? 
		<div className="status">
			Logging you out......
		</div>
		:
		<Redirect to="/"/>
		
		);

	}

	export default Logout;