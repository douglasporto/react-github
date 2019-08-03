import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import SearchRepo from './pages/SearchRepo';
import Repository from './pages/Repository';
import User from './pages/User';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/search-repo" component={SearchRepo} />
        <Route path="/repository/:repository" component={Repository} />
        <Route path="/user/:user" component={User} />
      </Switch>
    </BrowserRouter>
  );
}
