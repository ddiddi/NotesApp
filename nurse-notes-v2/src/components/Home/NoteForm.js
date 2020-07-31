import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const INITIAL_STATE = {
  email: '',
  title: '',
  note: '',
  last_modified: ''
};

class NoteForm extends Component {
constructor(props) {
  super(props);
  this.state = { ...INITIAL_STATE };
}

componentDidMount() {
  if (this.props.match.params.uid === 0 || this.props.match.params.uid == null) {
    this.setState({
      email: this.props.email.slice(0,-4), 
      title: '',
      note: '',
      last_modified: new Date().getTime().toString(),
    });

  } else {
  this.props.firebase.note(this.props.email.slice(0,-4), this.props.match.params.uid).on('value', snapshot => {
    const notesObject = snapshot.val();
    console.log("MOUNT");
    console.log(notesObject);
    

        this.setState({
          email: this.props.email.slice(0,-4), 
          title: notesObject.title,
          note: notesObject.note,
          last_modified: new Date().getTime().toString(),
        });
    

  });
}
  
}

onSubmit = event => {
  const { title, note } = this.state;
  const last_modified = new Date().getTime().toString();;
  const email = this.props.email.slice(0,-4);
  this.props.firebase
    .doCreateNote(email, title, note, last_modified)
    .then(() => {
      console.log("Submitted");
        }).catch(error => {
      this.setState({ error });
    });
  this.props.history.push('/home')
};

onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

render() {
  const {
    title,
    note,
  } = this.state;

  const isInvalid =
    title === '' ||
    note === '';

  return (
    <form onSubmit={this.onSubmit}>
    <TextField
              variant="filled"
              required
              fullWidth
              value={title}
              onChange={this.onChange}
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
            />

<TextField
              multiline
              fullWidth
              variant="filled"
              rows={10}
              margin="normal"
              required
              value={note}
              onChange={this.onChange}
              id="note"
              label="Notes"
              name="note"
              autoComplete="note"
            />

      <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isInvalid}
          >
          Submit
        </Button>
  
    </form>
  );
}
}


export default withRouter(
  withFirebase(
    NoteForm));
