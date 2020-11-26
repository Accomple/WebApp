import React,{useState,useEffect} from 'react';
import {Route,Link,Switch} from 'react-router-dom';
import AddBuildings from './addBuilding';
import FrontPage from './frontPage';
import LoginPage from './loginPage';
import BuildingList from './availableRoom';
import BuildingDetails from './descComponent';
import Logout from './logout';
import Button from 'react-bootstrap/Button';
import SignUp from './signup';
import axios from "axios";
import ROOT_URL from "../host";
import OwnerDashBoard from "./ownerdashboard";
import OwnerBuildingDetails from "./ownerBuildingDetails";
import AddRooms from "./addRoom";
import ActiveBookings from "./activeBookings"
import "../assets/css/frontPage.css";
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import MyBookings from './userbooking';
import BookingProcess from './bookingProcess';
import MyBookmarks from './userbookmarks';
import CancelBookingProcess from './cancelBooking';
import CancelBookingProcessOwner from './ownerCancelbookingprocess';
import PrivateRouteOwner from './privateRouteOwner';
import PrivateRoutetUser from './privateRouteUser'
import PageNotFound from './pagenotfound';
import OtpVerification from './otpverification'
const RoutingPage=()=>{
	const [show,setShow]=useState(false);
	const [showLoginModal,setLoginModal]=useState(false);
	const [loggged,setlogged]=useState(false);
	const [is_owner,setIsowner]=useState("false");
	const [cities,setCities]=useState([]);
	const handleClose=()=>setShow(false);
	const handleShow=()=>setShow(true);
	const handleLoginClose=()=>setLoginModal(false);
	const handleLoginShow=()=>setLoginModal(true);
	useEffect(()=>{
		if(localStorage.getItem('loggedIn')!=null)
		{
			setlogged(localStorage.getItem('loggedIn'));
			setIsowner(localStorage.getItem('is_owner'));
			console.log(localStorage.getItem('is_owner'))
			console.log(is_owner)
		}
	},[loggged]);

	useEffect(()=>{
		axios.get(`${ROOT_URL}/active_cities/names/`)
        .then(
            response => {
                setCities(response.data)
            }
        )
	},[])
	
	return(
		<div>
			<div>
				<header className="top-bar">
					<div className="bar">
						<div className="logo">Accomple</div>
						<div className="bar-components">
						<div className="component">About us</div>
						{
							(is_owner==="false"||!loggged)?
								<>
								<div className=""><Button className="custom-button3" onClick={handleLoginShow}>Partner with us</Button></div>
								<div className="componen"><Button className="custom-button3" onClick={handleShow}>Explore Residences</Button></div>
								</>
								:
								null
						}
						{
							!loggged ?
							<>

							<Link className="component" to="/login">Log in</Link>
							<Link className="component" to="/signup">Sign Up</Link>
							</>
							: 

							<>
								<Dropdown>
  									<Dropdown.Toggle className="custom-button" id="dropdown-basic">
    								{localStorage.getItem('email')}
  									</Dropdown.Toggle>
  									{
  									is_owner==="false"?
  									<Dropdown.Menu>
  							 		 	<Dropdown.Item as={Link} to="/user/mybookings">My Bookings</Dropdown.Item>
    									<Dropdown.Item as={Link} to="/user/bookmarks">Favorites</Dropdown.Item>
   									 	
 									 </Dropdown.Menu>
 									 :
 									 <Dropdown.Menu>
  							 		 	<Dropdown.Item as={Link} to="/owner/dashboard">My Buildings</Dropdown.Item>
    									<Dropdown.Item as={Link} to="/owner/addBuilding">Register New Buildings</Dropdown.Item>
   									 	
 									 </Dropdown.Menu>
 									}
									</Dropdown>
								<Link className="component" to="/logout">Logout</Link>
							</>
						}
						</div>
					</div>
				</header>
		<Modal 	show={show} onHide={handleClose} animation={false} size="lg"
      			aria-labelledby="contained-modal-title-vcenter"
     			centered>
        	<Modal.Header closeButton>
          		<Modal.Title>Explore best PG's in 5+ cities</Modal.Title>
        	</Modal.Header>
        	<Modal.Body>
        		Select a city you want to explore
        		<div className="cities">
        			{
        				cities.map((obj)=>{return <Link className="cust-button2" to={"/"+obj}>{obj.toUpperCase()}</Link>})
        			}
        				
        		</div>
        	</Modal.Body>      
      	</Modal>

      	<Modal show={showLoginModal} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body ><div className="modal-alert">Please log in as owner</div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            Close
          </Button>
          <Link className="cust-button2"to="/login">Login as owner</Link>	

        </Modal.Footer>
      </Modal>

      	</div>
		<div>
		<Switch>
			<Route exact path="/error/pagenotfound" component={PageNotFound}/> 
			<PrivateRoutetUser exact path="/user/mybookings" component={MyBookings}/>
			<PrivateRoutetUser exact path="/user/bookingprocess" component={BookingProcess}/>
			<PrivateRoutetUser exact path="/user/cancelbookingprocess" component={CancelBookingProcess}/>
			<PrivateRouteOwner exact path="/owner/cancelbookingprocess" component={CancelBookingProcessOwner}/>
			<PrivateRoutetUser exact path="/user/bookmarks" component={MyBookmarks}/>
			<PrivateRouteOwner exact path="/owner/activebookings/:id" component={ActiveBookings}/>
			<Route exact path="/signup" render={props=><SignUp changeState={setlogged}/>} />
			<Route exact path="/login" render={props=><LoginPage changeState={setlogged}/>}/>
			<Route exact path="/logout" render={props=><Logout changeState={setlogged}/>}/>
			<Route exact path="/otpverification" component={OtpVerification}/>
			<PrivateRouteOwner exact path="/owner/dashboard" component={OwnerDashBoard}/>
			<PrivateRouteOwner exact path="/owner/buildingdetails/:id" component={OwnerBuildingDetails}/>
			<PrivateRouteOwner exact path="/owner/addBuilding" component={AddBuildings}/>
			<PrivateRouteOwner exact path="/owner/addRoom/:id" component={AddRooms}/>
			<Route exact path="/:city" component={BuildingList}/>
			<Route exact path="/buildingdetails/:id"  component={BuildingDetails}/>
			<Route exact path="/" component={FrontPage}/>
		</Switch>
		</div>
	</div>
		);
}
export default RoutingPage;