import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/HomeView';
import Restaurant from './views/RestaurantView';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/:city/:restaurant' exact component={Restaurant} />
            </Switch>
        </Router>
    );
}

export default App;
