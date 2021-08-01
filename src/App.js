import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home.js/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register.js/Register';
import { Provider } from "react-redux";
import store from "./redux/store/store"
import { API, config, setAuthToken } from "./config/API";
import UserRoute from './components/Route/User';
import Profile from './pages/Profile/Profile';
import { loadUser } from './redux/actions/auth';
import Write from './pages/Write/Write';
import Form from './pages/Form/Form';
import AdminRoute from './components/Route/Admin';
import SubCategory from './pages/SubCategory/SubCategory';
import Read from './pages/Read/Read';
import Music from './pages/Music/Music';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(()=>{
      store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <Router>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <UserRoute exact path="/profile" component={Profile} to={"/login"}/>
              <UserRoute exact path="/write/:id" component={Write} to={"/login"}/>
              <UserRoute exact path="/music" component={Music} to={"/login"}/>
              <AdminRoute exact path="/form" component={Form}/>
              <Route exact path="/sub-category/:id" component={SubCategory}/>
              <Route exact path="/content/:id" component={Read}/>
          </Switch>
      </Router>
    </Provider>
  )
}

export default App

