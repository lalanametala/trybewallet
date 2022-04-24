import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  const userEmail = localStorage.getItem('trybewallet-user');

  return (
    <Switch>
      <Route exact path="/carteira" component={ Wallet } />
      <Route
        exact
        path="/"
        render={ (props) => (userEmail
          ? <Redirect to="/carteira" />
          : <Login { ...props } />) }
      />
    </Switch>
  );
}

export default App;
