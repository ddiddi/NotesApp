import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
 
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
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
        
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        {error && <p >{error.message}</p>}
        <form onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="passwordOne"
          
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
            fullWidth
            label="Password"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
            fullWidth
            label="Password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isInvalid}
          >
            Reset My Password
          </Button>
        </form>
        <Button
          margin="normal"
            href="/home"
            fullWidth
            variant="contained"
            color="primary"
          >
            Home
          </Button>

      </Paper>
      
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>



    );
  }
}
 
export default withFirebase(PasswordChangeForm);