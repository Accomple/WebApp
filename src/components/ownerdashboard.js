import React,{useEffect,useState} from 'react';
import "../assets/css/roomList.css"
import '../assets/css/availableRoom.css';
import CustomLoader from './loader';
import BuildingCard from "./ownerBuilding";
import ROOT_URL from "../host";
import axios from "axios";


const OwnerDashboard=()=>{

const [rooms,setRooms]=useState([]);
const [responseLoaded,setResponseLoaded]=useState(false);

useEffect(()=>{
	const authAxios=axios.create({
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		})
		authAxios.get(`${ROOT_URL}/accounts/buildings/get/user=me/`)
		.then((response)=>{
			console.log(response.data)
			setRooms(response.data)
			setResponseLoaded(true)
		})},[]);


return(
	<div>
		{
		!responseLoaded ?
		<CustomLoader/>
		:
		<div className="room-list2">

                            {
                                rooms.map(object =>
                                    
                                        <
                                            BuildingCard
                                            key={object.id}
                                            id={object.id}
                                            buildingName={object.building_name}
                                            area={object.area}
                                            landmark={object.landmark}
                                            latitude={object.latitude}
                                            longitude={object.longitude}
                                            genderLabel={object.gender_label}
                                            displayPic={object.display_pic}
                                      
                                        />
                                    
                                )
                            }

         </div>
     }
     </div>
);
}

export default OwnerDashboard;