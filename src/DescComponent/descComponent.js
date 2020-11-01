
import React from 'react';
import './descComponent.css';
import PhotoCarousel from './photoCarousel';
import  GoogleMapReact from 'google-map-react';
import Button from 'react-bootstrap/Button';

const facilities=(props)=>{
  const x= props.map((items)=><li className="list-item">{items}</li>);
  return(
    x
    );
}
const genderInformation=(props)=>{
  if(props==="male"){
    return(
      <div className="genderInformation">
        <span className="gender-type-male" >MALE RESIDENCE</span>
        <span className="gender-bar-male"></span>
      </div>
      );
  }
  else if(props==="female"){
       return(
      <div className="genderInformation">
        <span className="gender-type-female" >FEMALE RESIDENCE</span>
        <span className="gender-bar-female"></span>
      </div>
      );
  }
  else
  {
       return(
      <div className="genderInformation">
        <span className="gender-type-unisex" >UNISEX RESIDENCE</span>
        <span className="gender-bar-unisex  "></span>
      </div>
      );
  }
}
const descComponent=()=>{
return(
  <div>
  <header className="Top-Bar"> 
    <div  className="Bar">
      <div className="LOGO">LOGO</div>
      <Button className="Reserve-button">Book Now</Button>
    </div>
  </header>
	<div className="Main-Window" >
  <div className="photoCarousel ">
	<PhotoCarousel/>
  </div>
  <div className="Info">
  <div className="First-Row">
  <h1 className="Building-heading">
    Building-name
  </h1>
    <div className="Share-logo">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#FFF" height="2em" width="2em" ><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></svg>
    </div>
  </div>
  {genderInformation("male")}



  <div className="Price-Info">
  <span className="starts-from">Occupancy starting at just </span>
  <span className="ammount">&#x20B9; 3000/month</span>
  </div>


  <p className="Description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
   remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
   and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

	<div className="map-window">
	<GoogleMapReact style={{width:"100%", height:"100%",position:"relative"}}
  bootstrapURLKeys={{
    key:'AIzaSyDaYOAq4rQpRmWwclj-_sEOSrLboBtXyIM',
    language: 'en',
  }}
   center={{lat:40.73, lng:-73.93}}
   zoom= {12} 
  >
   <div lat={40.73} lng={-73.93} className="marker-outer">
  <div  className="marker" >Building-name</div>
  </div>
  </GoogleMapReact>
</div>
<div className="Facilities">
<h1 className="Facilities-available">Facilities Available</h1>
<ul>
  {facilities(["Drinking Water","Light","Cleaning","Laundry Available"])}
</ul>
</div>
</div>
</div>
</div>
);
}

export default descComponent;
