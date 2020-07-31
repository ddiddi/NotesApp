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

function TModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>

      <Modal
        size='xl'
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2> NurseNote</h2>
            <NoteForm/>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}

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



class DashboardBase extends Component {
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
    console.log(note)
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
                    <IconButton edge="end" aria-label="delete" onClick={()=>this.props.firebase.doRemoveNote("ddd",note.title, note.note, note.last_modified)} >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                ))}
            </List>
            </Container>
            </Container>
            <Button disableElevation color="primary" href="/notes">
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

const Dashboard = compose(
  withRouter,
  withFirebase,
  )(DashboardBase);

export default DashboardPage;
export { Dashboard };






// const Dash = () => (
//     <AuthUserContext.Consumer>
//       {authUser => (
        

//       )}
//     </AuthUserContext.Consumer>
            
//   );