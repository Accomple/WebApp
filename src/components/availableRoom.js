import React ,{useState,useEffect} from 'react';
import '../assets/css/availableRoom.css';
import CustomLoader from './loader';
import RoomList from "./roomList";
import ROOT_URL from "../host";
import axios from "axios";
var timer=null;


const AvailableRoom=(props)=>{
const city=props.match.params.city;

const [rooms,setRooms]=useState([]);
const [gender,setGender]=useState('');
const [price,setPrice]=useState('');
const [disPrice,setDisprice]=useState(9999);
const [responseLoaded,setResponseLoaded]=useState(false);


const handleChange=(event)=>{
	timer&&clearTimeout(timer);
	setDisprice(event.target.value);
	timer=setTimeout(()=>{ setPrice(disPrice)},1000);
	
}


useEffect(()=>{
	if(price===''&&gender==='')
	{
		setResponseLoaded(false);
		 axios.get(`${ROOT_URL}/accommodations/city${"%3D"+city}/`)
        .then(
            response => {
                setRooms(response.data);
                setResponseLoaded(true);
            }
        )
        .catch(
            error => {
                console.log(error.response);
            }
            )
	}
	else if(price==="")
	{
		setResponseLoaded(false);
		 axios.get(`${ROOT_URL}/accommodations/city${"%3D"+city}&gender_label${"%3D"+gender}/`)
        .then(
            response => {
                setRooms(response.data)
                setResponseLoaded(true)
            }
        )
        .catch(
            error => {
                console.log(error.response)
            }
            )
	console.log("onlyGender");
	
	}
	else if(gender==="")
	{
		setResponseLoaded(false)
		 axios.get(`${ROOT_URL}/accommodations/city${"%3D"+city}&rent_lte${"%3D"+price}/`)
        .then(
            response => {
                setRooms(response.data)
                setResponseLoaded(true)
            }
        )
        .catch(
            error => {
                console.log(error.response)
            }
            )
		console.log("OnlyPrice");
	}
	else
	{
		setResponseLoaded(false);
		 axios.get(`${ROOT_URL}/accommodations/city${"%3D"+city}&rent_lte${"%3D"+price}&gender_label${"%3D"+gender}/`)
        .then(
            response => {
                setRooms(response.data)
                setResponseLoaded(true)
            }
        )
        .catch(
            error => {
                console.log(error.response)
            }
            )
		console.log("BOTH");
	}
},[gender,price,city])


	return(
			<div className="main-page">
				<div className="filter-section">
					<div className="heading-filter">Filters</div>
					<div className="filter-by">GENDER</div>
					<div className="form-field">			
						<label className="containe">Male
  							<input type="radio" checked={gender==='M'} onChange={()=>{}} onClick={()=>{setGender('M')}}name="radio"/>
  							<span className="checkmark"></span>
						</label>
						<label className="containe">Female
  							<input type="radio" checked={gender==='F'} onChange={()=>{}} onClick={()=>{setGender('F')}} name="radio"/>
  							<span className="checkmark"></span>
						</label>
						<label className="containe">Unisex
  							<input type="radio" checked={gender===''} onChange={()=>{}} onClick={()=>{setGender('')}} name="radio"/>
  							<span className="checkmark"></span>
						</label>
				
					</div>
					<div className="filter-by">PRICE</div>
					<div className="form-field">
						<span className="less-than">Less than </span>	
						<span className="price-display">&#x20B9;{disPrice}</span>		
						<input type="range" min="1" max="9999" defaultValue="9999" onChange={handleChange} className="slider"/>
						
					</div>
				</div>	
				<div className="room-list">
					<div className="room-list-heading">
						<div className="text-head">EXPLORE BEST PGs IN 
							<div className="City-name">{city.toUpperCase()}</div>
							FOR GIRLS AND BOYS
						</div>
					</div>
					<div className="Avail-rooms">
						{
							responseLoaded ? <RoomList roomList={rooms}/> :<CustomLoader />

						}
						
					</div>
				</div>

			</div>
		);
}

export default AvailableRoom;