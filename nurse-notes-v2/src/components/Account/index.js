import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);