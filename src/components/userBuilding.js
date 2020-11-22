import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../assets/css/cardcomponent.css';
import male_img1 from "../assets/Male_3x.png";
import female_img2 from "../assets/Female_3x.png";
import perks_img from "../assets/cutlery.png";
import ROOT_URL from "../host";
import Button from 'react-bootstrap/Button';
import likeimg from "../assets/like.png";
import dislikeimg from "../assets/dislike.png";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const genderComponent=props=>{
	if(props==="M")
		return(
			<div>
       	 		<img className="gender-allowed" src={male_img1} alt="Img"/>
       	 		<span className="attributes-1">MALE</span>
       		</div>
		);
	if(props==="F")
		return(
			<div>
       	 		<img className="gender-allowed" src={female_img2} alt="Img"/>
       	 		<span className="attributes-1">FEMALE</span>
       		</div>
		);
	if(props==="U")
		return(
			<div>
       	 		<img className="gender-allowed" src={male_img1} alt="Img"/>
       	 		<img className="gender-allowed" src={female_img2} alt="Img"/>
       	 		<span className="attributes-1">UNISEX</span>
       		</div>
       	);
}




const BuildingCard =props=>{

const clickHandler=()=>{
	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.delete(`${ROOT_URL}/accounts/bookmark/delete/id${"%3D"+props.bookmark_id}/`)
		.then((response)=>{
			console.log(response.data)
			handleAppear();
			
		});

}

const [show,setShow]=useState(false);
const handleremove=()=>{setShow(false);window.location.reload(false);};
const handleAppear=()=>setShow(true);
var lat=props.latitude;
var lon=props.longitude;
var link="http://www.google.com/maps/place/";
link=link+lat+","+lon;
return(
<Card className="lmn">
  <Card.Img variant="top" src={ROOT_URL+props.displayPic} />
  <Card.Body>
		<div className="Line1" >
			<div className="building-name">
				<span>{props.buildingName}</span>
			</div>
			{genderComponent(props.genderLabel)}
		</div>
		<div  className="Line2">
			<div className="locality-name">
				<span>{props.area}</span>
			</div>
			<div className="view-location">
				<a href={link}><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
				<span>view location</span></a>
			</div>
		</div>
		<div className="Line2">
			<div className="locality-name">
				<span>{props.landmark}</span>
			</div>
			<img className="gender-allowed" onClick={clickHandler} src={dislikeimg} alt="Img"/>
			
		</div>
		<div className="Line4">
			<span >
				<img className="facility" src={perks_img} alt="img"/>
				<span className="attributes">{props.perks.map((elem)=>elem.description).join()}</span>
			</span>
		</div>
		<div className="Line5">
			<div className="price-section">
				<span className="starts-from">Starts from</span>
				<span className="ammount">&#x20B9; {props.startingRent}/month</span>
			</div>
			<Link className="cust-button" to={"/buildingdetails/"+props.id} >Get Details</Link>
		</div>



 	 </Card.Body>
 	 <Modal show={show} onHide={handleremove} size="sm">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Removed from favorites</Modal.Body>
      </Modal>
</Card>
);
}
export default BuildingCard;