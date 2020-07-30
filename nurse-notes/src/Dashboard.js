import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TAppBar from './dash';
import Firebase from "firebase";
import config from "./config";
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tmodal from './modal'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
        Firebase.initializeApp(config);
    } 
    this.state = {
        notes: []
      };
    
  }
  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update")

  }

//   writeUserData = () => {
//     Firebase.database()
//       .ref("/")
//       .set(this.state);
//     console.log("DATA UPLOADED");
//   };

  getUserData = () => {
    let ref = Firebase.database().ref("notes");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  removeData = (note) => {
    const notes = this.state;
    var newState = {};
    const keys = Object.keys(this.state);
    const remKeys = keys.slice(1);
    remKeys.filter(key => {
        if (notes[key].uid !== note.uid) {
            newState[key] = notes[key];
        }

    });
    console.log(newState);
    this.setState({ notes: newState});
    console.log(notes);
    Firebase.database()
      .ref("notes")
      .set(newState);
    
  };

  render() {
    const notes = this.state;

    const keys = Object.keys(this.state);
    const remKeys = keys.slice(1);
    return (
    <Container component="main" maxWidth="false" disableGutters="true">
    <TAppBar/>
      <CssBaseline />
        <Paper 
            elevation = {3}
            style={{ 
                padding: 10, 
                margin: 20, 
                backgroundColor: '#fafafa' ,
                marginTop: 80,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                }}>
            <Container
            size="md">
            <List dense={true}>
            {remKeys.map(key => (
                <div key={notes[key].uid}>
                <input type="hidden" ref="uid" />
                <ListItem button divider>
                    <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={notes[key].title}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => this.removeData(notes[key])}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                </div>
            ))}
            </List>
            </Container>
          
        <Tmodal/>
        </Paper>
        
        </Container>
    );
  }
}

export default Dashboard;

