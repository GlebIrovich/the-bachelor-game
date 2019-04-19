import React from 'react';
import { Route, Switch } from 'react-router';

import AuthorizedRoute from '../AuthorizedRoute';
import GameScreen from '../GameScreen';
import Main from '../MainView/Main';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" render={() => <Main loginRequired/>} />
      <AuthorizedRoute path="/game/:gameId" component={GameScreen} />
    </Switch>
  )
}

export default Routes
