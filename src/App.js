import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ScreenGame from './pages/ScreenGame';
import Settings from './pages/Settings';

export default function App() {
  return (
    <section>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ ScreenGame } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </section>
  );
}
