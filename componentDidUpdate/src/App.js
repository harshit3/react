import React, { Component } from 'react';
import image from './ima.png';
import image1 from './ima1.jpg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="container">
        <hr/>
        <div className="row">
          <div className="col-sm-1.5">
            <img src={image1} className="rounded-circle" height='80px' width='80px'/>
          </div>
          <div className="col-sm-10">
            <h4>Social Card</h4>
            <p>Card Details</p>          
          </div>
        </div>
        
        <div className="card main">
          <img className="card-img-top" src={image}/>
          <div className="card-body">
            <h5 className="card-title">This is card title</h5>
            <h6 className="card-text">This is card body text</h6>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

export default App;
