import React from 'react';
 
import { AuthUserContext} from '../Session';
import { withAuthorization } from '../Session';
import Dashboard from './Dashboard'

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Dashboard email={authUser.email} />
      </div>
  )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);