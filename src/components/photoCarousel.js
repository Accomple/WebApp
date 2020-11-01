import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../cardAssests/room_photos/Room.jpg';
import img2 from '../cardAssests/room_photos/Room1.jpg';
import img3 from '../cardAssests/room_photos/room2.jpg';
import '../assets/css/photoCarousel.css';

const photoCarousel=props=>{
    return(
        <div>
            <Carousel >
                <Carousel.Item interval="2000">
                    <img
                        className="x"
                        src={img1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval="2000">
                    <img
                        className="x"
                        src={img2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval="2000">
                    <img
                        className="x"
                        src={img3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
export default photoCarousel;