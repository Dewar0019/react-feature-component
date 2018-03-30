import React, { Component } from 'react';
import Features from './components/Features/Features'
import data from './camp_features';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="features">
          <ul className="features--list">
          <Features data={data} />
        </ul>
        </div>
      </div>
    );
  }
}

export default App;
