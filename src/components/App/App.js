import React, { Component } from 'react';
import Features from '../Features/Features'
import data from '../../camp_features';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <section className="features">
          <h1> Click for more details </h1>
          <ul className="features--list">
          <Features data={data} />
        </ul>
        </section>
      </div>
    );
  }
}

export default App;
