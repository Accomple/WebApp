import React from 'react';
import BuildingCard from "./BuildingCard";
import "../assets/css/roomList.css"

export default function RoomList(props){
    return(
       <div className="room-list2">
                            {
                                props.roomList.map(object =>
                                    
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
                                            startingRent={object.starting_rent}
                                            perks={object.perks}
                                        />
                                    
                                )
                            }

         </div>
    )
}