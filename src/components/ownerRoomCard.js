import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../assets/css/cardcomponent.css';
import img1 from '../assets/bed.png';
import {Link} from 'react-router-dom';
const card =props=>{
return(
<Card className="lmn">
  <Card.Body>  
		<div className="Line1" >
			<div className="building-name">
				<span>{props.title}</span>
			</div>
		</div>
		<div className="Line3">
			<img className="people-count" src={img1} alt="img"/>
			<span className="attr-head">Total Beds:</span>
			<span className="attributes">{props.total}</span>
		</div>
		<div className="Line4" >
		<img className="people-count" src={img1} alt="img"/>
		<span className="attr-head">Available Beds:</span><span className="attributes">{props.available}</span>
		</div>
		<div>
			{
				props.is_verified?
				<span className="verified">VERIFIED</span>
				:
				<span className="not-verified">NOT VERIFIED</span>
			}
		</div>
		<div className="Line5">
			<div className="price-section">
				<span className="starts-from">Rent</span>
				<span className="ammount">&#x20B9; {props.rent}/month</span>
			</div>
			<Link className="cust-button" to={`/owner/activebookings/${props.id}`}>See Active Bookings</Link>
		</div>

 	 </Card.Body>
</Card>
);
}
export default card;