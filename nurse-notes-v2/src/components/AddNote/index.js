import React from 'react';
 
import { AuthUserContext} from '../Session';
import { withAuthorization } from '../Session';
import NoteForm from '../Home/NoteForm'

const AddNotePage = ({ match, location }) => (
  <AuthUserContext.Consumer>
    {authUser => (

      // Sending email to note form to be indexed and redered
      <div>
        <NoteForm email = {authUser.email} />
      </div>
    )}
    </AuthUserContext.Consumer>
  

);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AddNotePage);