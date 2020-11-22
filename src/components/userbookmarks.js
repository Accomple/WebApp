import React,{useEffect,useState} from 'react';
import "../assets/css/roomList.css"
import '../assets/css/availableRoom.css';
import CustomLoader from './loader';
import BuildingCard from "./userBuilding";
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
		authAxios.get(`${ROOT_URL}/accounts/bookmarks/get/user=me/`)
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
                                            key={object.building.id}
                                            bookmark_id={object.id}
                                            id={object.building.id}
                                            buildingName={object.building.building_name}
                                            area={object.building.area}
                                            landmark={object.building.landmark}
                                            latitude={object.building.latitude}
                                            longitude={object.building.longitude}
                                            genderLabel={object.building.gender_label}
                                            displayPic={object.building.display_pic}
                                            startingRent={object.building.starting_rent}
                                            perks={object.building.perks}
                                        />
                                    
                                )
                            }

         </div>
     }
     </div>
);
}

export default OwnerDashboard;