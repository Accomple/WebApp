import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import "./frontPage.css";
import Modal from 'react-bootstrap/Modal'

const FrontPage=()=>{
	const [show,setShow]=useState(false);
	const handleClose=()=>setShow(false);
	const handleShow=()=>setShow(true);
	return(
			<div>
				<header className="top-bar">
					<div></div>
					<div className="bar">
						<div className="logo">LOGO</div>
						<div className="bar-components">
						<div className="component">About us</div>
						<div className="component">Partner with us</div>
						<div className="component"><Button className="custom-button" onClick={handleShow}>Explore Residences</Button></div>
						</div>
					</div>
				</header>
			
		<Modal show={show} onHide={handleClose} animation={false} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Explore best PG's in 5+ cities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	Select a city you want to explore
        	<div className="cities">
        		<Link className="cust-button2" to="/pune">PUNE</Link>
        		<Link className="cust-button2"to="/mumbai">MUMBAI</Link>
        		<Link className="cust-button2"to="/nagpur">NAGPUR</Link>	
        	</div>
        </Modal.Body>
        
      </Modal>
      </div>
		);
}
export  default FrontPage;