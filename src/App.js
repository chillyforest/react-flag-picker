import React, {Component} from 'react';
import FlagPicker from './components/FlagPicker/FlagPicker';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Wrapper">
          <div className="header-title">
            <h1>Flag Picker</h1>
          </div>
          <FlagPicker/>
        </div>
      </div>
    );
  }
}

export default App;
