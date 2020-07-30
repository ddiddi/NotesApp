import React, { createRef } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Firebase from "firebase";

class NoteForm extends React.Component {

    constructor(props) {
        super(props);
        this.textRefTitle = createRef();
        this.textRefNote = createRef();
        this.textRefTags = createRef();
    
    }
    
      handleSubmitNote = event => {
        let title = this.textRefTitle.current.value;
        let note = this.textRefNote.current.value;
    
        // Get current DB
        let ref = Firebase.database().ref("notes");
       
        const uid = new Date().getTime().toString();
        const newNote = { 
            uid: uid,
            title: title,
            note: note
        };
        
        ref.push(newNote);
        console.log("DATA UPLOADED");

        event.preventDefault();
        this.textRefTitle.current.value = "";
        this.textRefNote.current.value = "";
        
      };

      handleClose = event => {
        console.log("Closing without Saving");
      };

  render() {
    return (
      <form>
          <TextField
          label="Title"
          fullWidth
          inputRef={this.textRefTitle}
          id="outlined-margin-none"
          variant="filled"
        />

        <TextField
          id="outlined-multiline-static"
          label="Note"
          multiline
          fullWidth
          inputRef={this.textRefNote}
          variant="filled"
          rows={10}
        />

          <TextField
          label="Tags (comma separated)"
          fullWidth
          inputRef={this.textRefTags}
          id="outlined-margin-none-tags"
        />

        <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmitNote}
          >
            Submit
          </Button>

          <Button
            type="cancel"
            variant="contained"
            color="secondary"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
        
      </form>
    )
  }
}

export default NoteForm