import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Incident from './pages/Incident';
import Register from './pages/Register';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/register' component={Register} />
        <Route path='/incidents/new' component={Incident} />
      </Switch>
    </BrowserRouter>
  );
}
