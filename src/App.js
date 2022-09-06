import './Components/style.css';

import React from 'react';
import ProtectedRoute from './Components/isAuth';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ShowAllQuestions from "./Components/ShowAllQuestions";

import './Components/style.css';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <ProtectedRoute exact path="/showAllQuestions" component={ShowAllQuestions} />
        <Route exact path="" component={LogIn} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
