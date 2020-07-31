import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const NotePage = () => (
  <div>
    <NoteForm />
  </div>
);


const INITIAL_STATE = {
  email: '',
  title: '',
  note: '',
  last_modified: ''
};

class NoteFormBase extends Component {
constructor(props) {
  super(props);
  console.log("PROPS");
  console.log(props)
  this.state = { ...INITIAL_STATE };
}

onSubmit = event => {
  const { title, note } = this.state;
  const last_modified = new Date().getTime().toString();;
  const email = "ddd";
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
    email,
    title,
    note,
    last_modified
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


const NoteForm = compose(
  withRouter,
  withFirebase,
  )(NoteFormBase);

export default NotePage;

export { NoteForm };
