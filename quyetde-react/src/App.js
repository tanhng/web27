import React from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import QuestionDetail from './pages/QuestionDetail';
import Ask from './pages/Ask';
import Answer from './pages/Answer';
import NorFoundScreen from './pages/NotFoundScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Answer} exact={true} />
        <Route path='/ask' component={Ask} />
        <Route path='/question/:questionId' component={QuestionDetail} />
        <Route component={NorFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
