import React from 'react';
import {Route,Switch} from 'react-router-dom';
import FrontPage from './frontPage';
import BuildingList from './availableRoom';
import BuildingDetails from './descComponent';
const RoutingPage=()=>{
	return(
		<div>
			<Switch>
			<Route path="/" exact component={FrontPage}/>
			<Route path="/:city" exact component={BuildingList}/>
			<Route path="/buildingdetails/:id" exact component={BuildingDetails}/>
			</Switch>
		</div>
		);
}
export default RoutingPage;