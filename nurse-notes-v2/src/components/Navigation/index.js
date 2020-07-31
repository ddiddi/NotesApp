import React from 'react';

import { AuthUserContext } from '../Session';
 
import NavBarAuth from './NavBarAuth'
import NavBarNonAuth from './NavBarNonAuth'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavBarAuth /> : <NavBarNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);


 
export default Navigation;