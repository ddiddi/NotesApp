import React from 'react';
 
import { AuthUserContext} from '../Session';
import { withAuthorization } from '../Session';
import AddNote from './AddNote'
import NoteForm from '../Home/NoteForm'

const AddNotePage = ({ match, location }) => (
  <AuthUserContext.Consumer>
    {authUser => (

      <div>
        <NoteForm email = {authUser.email} />
      </div>
    )}
    </AuthUserContext.Consumer>
  

);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AddNotePage);