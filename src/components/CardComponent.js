import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardComponent.css';

const genderComponent = props=>{
    if(props==="male")
        return(
            <div>
                <img className="gender-allowed" src={require('../cardAssests/Male_3x.png')} alt="Img"/>
                <span className="attributes-1">MALE</span>
            </div>
        );
    if(props==="female")
        return(
            <div>
                <img className="gender-allowed" src={require('../cardAssests/Female_3x.png')} alt="Img"/>
                <span className="attributes-1">FEMALE</span>
            </div>
        );
    if(props==="unisex")
        return(
            <div>
                <img className="gender-allowed" src={require('../cardAssests/Male_3x.png')} alt="Img"/>
                <img className="gender-allowed" src={require('../cardAssests/Female_3x.png')} alt="Img"/>
                <span className="attributes-1">UNISEX</span>
            </div>
        );
}

export default function CardComponent (props){
    return(
        <Card className="lmn">
            <Card.Img variant="top" src={require('../cardAssests/Room.jpg')} />
            <Card.Body>
                {
                    //<Card.Title>Card Title</Card.Title>
                    //<Card.Text>
                    ///Some quick example text to build on the card title and make up the bulk of
                    //the card's content.
                    //</Card.Text>
                    //<Button variant="primary" >Go somewhere</Button>
                }
                <div className="Line1" >
                    <div className="building-name">
                        <span>Building Name</span>
                    </div>
                    {genderComponent("male")}
                </div>
                <div  className="Line2">
                    <div className="locality-name">
                        <span>Dhankawadi</span>
                    </div>
                    <div className="view-location">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                        </svg>
                        <span>view location</span>
                    </div>
                </div>
                <div className="Line3">
                    <img className="people-count" src={require('../cardAssests/bed.png')} alt="img"/>
                    <span className="attributes">{3 +" people"}</span>
                </div>
                <div className="Line4">
                    <span >
                        <img className="facility" src={require('../cardAssests/cutlery.png')} alt="img"/>
                        <span className="attributes">{["good food","High speed wifi","keepidssfsdsfsng"].join()}</span>
                    </span>
                </div>
                <div className="Line5">
                    <div className="price-section">
                        <span className="starts-from">Starts from</span>
                        <span className="ammount">&#x20B9; 3000/month</span>
                    </div>
                    <Button className="cust-button" >Get Details</Button>
                </div>
            </Card.Body>
        </Card>
    );
}