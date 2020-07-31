import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);
 
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

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
 
    return (
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
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error && <p >{error.message}</p>}
        <form onSubmit={this.onSubmit}>
              <TextField
                autoComplete="fname"
                name="username"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                value={username}
                onChange={this.onChange}
                label="Full Name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={this.onChange}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={passwordOne}
                onChange={this.onChange}
                name="passwordOne"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={passwordTwo}
                onChange={this.onChange}
                name="passwordTwo"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
              />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isInvalid}
            >
            Sign Up
          </Button>
          
          
          <Grid container >
            <Grid item>
            <p>
              Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </p>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
    )(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };