import React from 'react';
import axios from 'axios';
import {Container, Row, Col} from "react-bootstrap";
import ROOT_URL from "../host";
import CardComponent from "./CardComponent";

export default function RoomList(){
    let [accommodations,setAccommodations] = React.useState([])
    let [responseLoaded,setResponseLoaded] = React.useState(false)

    React.useEffect(()=>{
        axios.get(`${ROOT_URL}/accommodation/`)
        .then(
            response => {
                setAccommodations(response.data)
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
                                accommodations.map(object =>
                                    <Col>
                                        <
                                            CardComponent
                                            buildingName={object.building_name}
                                            area={object.area}
                                            genderLabel={object.gender_label}
                                            rent={object.starting_rent}
                                            displayPic={object.display_pic}
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