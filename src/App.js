import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
//import img1 from './cardAssests/room_photos/Room.jpg';
//import CC from './AvailableRooms/BuildingCard';
//import Maps from './DescComponent/descComponent';
import List1 from './components/routingPage';
const App=()=> {
  return(
  			<BrowserRouter>
  				<div>
  					<List1/>
      			</div>
      		</BrowserRouter>

      );
}

export default App;
