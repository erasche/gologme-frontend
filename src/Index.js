import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import About from './components/About';
import Day from './components/Day';
import Overview from './components/Overview';

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/about" component={About} />
      <Route path="/overview" component={Overview} />
      <Route path="/day/" component={Day} />
      <Route path="/day/:date" component={Day} />
    </Route>
  </Router>), document.getElementById('content')
);
