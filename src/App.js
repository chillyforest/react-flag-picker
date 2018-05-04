import React, { Component } from 'react';
import FlagPicker from './components/FlagPicker/FlagPicker';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="Wrapper">
            <div className="header-title">
              <h1>Flag Picker</h1>
            </div>
            <FlagPicker />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
