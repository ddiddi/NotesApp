import React from 'react';

import { withFirebase } from '../Firebase';

import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
  <Button variant="contained" onClick={firebase.doSignOut}>
    SignOut
  </Button>
);
 
export default withFirebase(SignOutButton);
