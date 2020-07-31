import React from 'react';
 
import { withAuthorization } from '../Session';
import AddNote from './AddNote'
import NoteForm from '../Home/NoteForm'

const AddNotePage = ({ match, location }) => (
      <div>
        <NoteForm />
      </div>
);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AddNotePage);