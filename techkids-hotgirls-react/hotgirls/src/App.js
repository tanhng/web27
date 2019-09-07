import React from 'react';
import './App.css';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import login from './pages/login';
import register from './pages/register';
import logout from './pages/logout';
import NorFoundScreen from './pages/NotFoundScreen';
import currentUser from './pages/currentUser';
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/users/register' component={register} />
      <Route path='/users/login' component={login} />
      <Route path='/users/logout' component={logout} />
      <Route path='/users/current-user' component={currentUser} />
      <Route component={NorFoundScreen} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
