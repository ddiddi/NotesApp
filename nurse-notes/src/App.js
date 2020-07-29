import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      </Switch>
    </main>
  );
}

export default App;
