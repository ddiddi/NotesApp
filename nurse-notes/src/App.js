import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard'
import TModal from './modal'
import Grid from '@material-ui/core/Grid'
import TAppBar from './dash'
import './App.css';
import { Switch, Route } from 'react-router-dom';



import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from './config';

const firebaseApp = firebase.initializeApp(config);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

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


function App() {
  return (
    <main>
      <TAppBar/>
      <Container component="main" maxWidth="xs">
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
        <Grid 
        container
        direction="column"
  justify="center"
  alignItems="center"
  spacing={2}
        >
        <Grid item>
        <Typography component="h1" variant="h5">
          Welcome to NurseNotes! 
        </Typography>
        </Grid>

        <Grid item>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" 
          >
          New User? Register
          </Button>
        </Grid>
        
        <Grid item>
          
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"  
          >
            Log In with Account
          </Button>

        </Grid>

        </Grid>
          
            
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
      <Switch>
      <Route exact path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/modal' component={TModal} />
      </Switch>
    </main>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
