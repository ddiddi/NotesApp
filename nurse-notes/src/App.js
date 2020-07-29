import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard'
import BaseList from './BaseList'
import ChipsArray from './chips'
import TModal from './modal'
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/list' component={BaseList} />
      <Route path='/chips' component={ChipsArray} />
      <Route path='/modal' component={TModal} />
      </Switch>
    </main>
  );
}

export default App;
