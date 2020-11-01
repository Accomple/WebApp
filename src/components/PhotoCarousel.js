import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/room_photos/Room.jpg';
import img2 from '../assets/room_photos/Room1.jpg';
import img3 from '../assets/room_photos/room2.jpg';
import '../assets/css/PhotoCarousel.css';

export default function photoCarousel(props){
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