import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import PostDetails from "./components/postdetails";
import "./styles.css";

class App extends Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:postid" component={PostDetails} />
        </Switch>
      </Router>
    );
  }
}

export default App;
