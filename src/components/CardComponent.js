import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../assets/css/CardComponent.css';
import ROOT_URL from "../host";

const genderComponent = (label)=>{
    if(label==="M")
        return(
            <div>
                <img className="gender-allowed" src={require('../assets/Male_3x.png')} alt="Img"/>
                <span className="attributes-1">Male</span>
            </div>
        );
    if(label==="F")
        return(
            <div>
                <img className="gender-allowed" src={require('../assets/Female_3x.png')} alt="Img"/>
                <span className="attributes-1">Female</span>
            </div>
        );
    if(label==="U")
        return(
            <div>
                <img className="gender-allowed" src={require('../assets/Male_3x.png')} alt="Img"/>
                <img className="gender-allowed" src={require('../assets/Female_3x.png')} alt="Img"/>
                <span className="attributes-1">Unisex</span>
            </div>
        );
}

let starPerks = (perks)=>{
    let set = new Set()
    perks.forEach((perk)=>{
        let description = perk.description
        if (description.toLowerCase()==="food")
            set.add("Food")
        if (description.toLowerCase()==="wifi")
            set.add("WiFi")
        if (description.toLowerCase()==="wi-fi")
            set.add("WiFi")
    })
    let array = []
    set.forEach((perk)=>{
        array.push(perk)
    })
    return array.join(", ")
}

export default function CardComponent (props){

    return(
        <Card className="lmn">
            <Card.Img variant="top" className="image" src={ROOT_URL+props.displayPic} />
            <Card.Body>
                <div className="Line1" >
                    <div className="building-name">
                        <span>{props.roomName}</span>
                    </div>
                    {genderComponent(props.genderLabel)}
                </div>
                <div  className="Line2">
                    <div className="locality-name">
                        <span>{props.area}</span>
                    </div>
                    <div className="view-location">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                        </svg>
                        <span>view location</span>
                    </div>
                </div>
                <div className="Line3">
                    <img className="people-count" src={require('../assets/bed.png')} alt="img"/>
                    <span className="attributes">{props.occupancy} people</span>
                </div>
                <div className="Line4">
                    <span >
                        <img className="facility" src={require('../assets/cutlery.png')} alt="img"/>
                        <span className="attributes">{starPerks(props.perks)}</span>
                    </span>
                </div>
                <div className="Line5">
                    <div className="price-section">
                        <span className="starts-from">Starts from</span>
                        <span className="ammount">&#x20B9; {props.rent}/month</span>
                    </div>
                    <Button className="cust-button" >Get Details</Button>
                </div>
            </Card.Body>
        </Card>
    );
}