import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';

import { getUser } from '../../services';

const AuthorizedRoute: FC<any> = ({component: RouteComponent, ...rest}) => {
  const user = getUser();
  console.log(user, history);
  
  return <Route {...rest} render={() => user ? <RouteComponent /> : < Redirect to="/login"/>}/>
}

export default AuthorizedRoute
