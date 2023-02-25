import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store/store"
import Home from "./pages/home/"
import Wrapper from './components/Wrapper/Wrapper';
import Method from './pages/method';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/method/:app/:name" component={Method}/>
            </Switch>
        </Wrapper>
      </Router>
    </Provider>
  )
}

export default App

