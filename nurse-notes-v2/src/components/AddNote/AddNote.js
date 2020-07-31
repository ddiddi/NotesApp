import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';

import { Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Tmodal from './Modal'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://tellusyoucare.com/">
        NurseNotes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



class AddNotePage extends Component {
  constructor(props) {
    super(props);
 
    this.state = { 
        loading: false,
        notes: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.notes("ddd").on('value', snapshot => {
      const notesObject = snapshot.val();
 
      const notesList = Object.keys(notesObject).map(key => ({
        ...notesObject[key],
        uid: key,
      }));
 
      this.setState({
        notes: notesList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.notes().off();
  }  

  removeData = (note) => {
      console.log(note);
  }

  updateNote = (note) => {
    console.log(note);
  }
 
  render() {
      const { notes, loading } = this.state; 
      
    return (
        <div>
        {loading && <div>Loading ...</div>}
        {/* <NoteList notes={notes} /> */}

    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper 
        elevation = {3}
        style={{ 
          padding: 40, 
          margin: 0, 
          backgroundColor: '#fafafa' ,
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Container
            size="xl">

            </Container>
      </Paper>
    </Container>


      </div>
    );
  }
}

 

export default withFirebase(AddNotePage);





// const Dash = () => (
//     <AuthUserContext.Consumer>
//       {authUser => (
        

//       )}
//     </AuthUserContext.Consumer>
            
//   );