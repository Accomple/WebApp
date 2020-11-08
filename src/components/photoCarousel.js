import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ROOT_URL from "../AvailableRooms/host";
import './photoCarousel.css';

const photoCarousel=props=>{
  console.log(props)
return(
  <div>
	<Carousel>
  {
    props.photos.map(object=>{
    return(
      <Carousel.Item interval="2000">
      <img
        key={object.id}
        className="x"
        src={ROOT_URL+object.photo}
        alt="Images"
      />
      </Carousel.Item>
      );
  })}
   
</Carousel>
</div>
);
}
export default photoCarousel;