import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './cardcomponent.css';
import img1 from '../cardAssests/bed.png';

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
		
		<div className="Line5">
			<div className="price-section">
				<span className="starts-from">Rent</span>
				<span className="ammount">&#x20B9; {props.rent}/month</span>
			</div>
			<Button className="cust-button" >Book</Button>
		</div>

 	 </Card.Body>
</Card>
);
}
export default card;