import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CardComponent from "./components/CardComponent";
import RoomList from "./components/RoomList";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <Switch>
                <Route exact path="/card" component={CardComponent}/>
                <Route exact path="/" component={RoomList}/>
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default App;
