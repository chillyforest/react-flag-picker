import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FlagPicker from './components/FlagPicker/FlagPicker';
import { AppContainer } from 'react-hot-loader';
import store from './store/store';
import './App.css';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(FlagPicker);

// Hot Module Replacement API
module.hot ||
  module.hot.accept('./components/FlagPicker/FlagPicker',
    () => render(require('./components/FlagPicker/FlagPicker')));