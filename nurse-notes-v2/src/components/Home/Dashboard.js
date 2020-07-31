import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
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

//import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import NoteForm from './NoteForm'


const DashboardPage = () => (
  <div>
    <Dashboard />
  </div>
);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    minWidth: '90vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


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



class Dashboard extends Component {
  constructor(props) {
    super(props);
 
    this.state = { 
        loading: false,
        notes: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
    const mail = this.props.email.slice(0, -4);
    console.log(mail);
    this.props.firebase.notes(mail).on('value', snapshot => {
      const notesObject = snapshot.val();
      if (notesObject == null) {
        console.log(notesObject)
        console.log("NULL");

        this.setState({
          notes: [],
          loading: false,
        });


      } else {
        console.log(notesObject)
        const notesList = Object.keys(notesObject).map(key => ({
          ...notesObject[key],
          uid: key,
        }));

        this.setState({
          notes: notesList,
          loading: false,
        });

      }
    });

  }

  componentWillUnmount() {
    this.props.firebase.notes().off();
  }  

  removeData = (note) => {
      console.log(note);
  }

  updateNote = (note) => {
    this.props.history.push('/notes/'+note.uid);
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

            <Container
            style={{
                maxHeight:500,
                overflow:'auto',
            }}>
            
            <List dense={true}>
                {notes.map(note => (
                <ListItem button divider onClick={()=>this.updateNote(note)}>
                    <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                       <p>{note.title} </p> 
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>this.props.firebase.doRemoveNote(note.email,note.title, note.note, note.last_modified)} >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                ))}
            </List>
            </Container>
            </Container>
            <Button disableElevation color="primary" href="/notes/0">
          New Note
          </Button>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>


      </div>
    );
  }
}

export default withRouter(
  withFirebase(
    Dashboard));



// const Dash = () => (
//     <AuthUserContext.Consumer>
//       {authUser => (
        

//       )}
//     </AuthUserContext.Consumer>
            
//   );