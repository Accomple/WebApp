import React from 'react';
import axios from 'axios';
import {Container, Row, Col} from "react-bootstrap";
import ROOT_URL from "../host";
import CardComponent from "./CardComponent";

export default function RoomList(){
    let [rooms,setRooms] = React.useState([])
    let [responseLoaded,setResponseLoaded] = React.useState(false)

    React.useEffect(()=>{
        axios.get(`${ROOT_URL}/accommodation/`)
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
    },[])

    return(
        <React.Fragment>
            <Container>
                {
                    responseLoaded ?
                        <Row xs={2} md={3} lg={3}>
                            {
                                rooms.map(object =>
                                    <Col>
                                        <
                                            CardComponent
                                            roomName={object.room.title}
                                            area={object.building.area}
                                            occupancy={object.room.occupancy}
                                            genderLabel={object.room.gender_label}
                                            rent={object.room.rent}
                                            displayPic={object.room.display_pic}
                                            perks={object.perks}
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                    :
                        <h1>Loading</h1>
                }
            </Container>
        </React.Fragment>
    )
}