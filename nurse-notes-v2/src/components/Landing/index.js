import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
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

const Landing = () => (
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
          NurseNotes Inc.
        </Typography>
        <br></br>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            href="/signin"
          >
            Sign Into Your Account
          </Button>
          <br></br>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            href="/signup"
          >
            Create a New Account
          </Button>
         
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>

);
 
export default Landing;