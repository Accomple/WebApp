import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CardComponent from "./components/CardComponent";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <Switch>
                <Route exact path="/" component={CardComponent}/>
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default App;
