import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';
// import { ServerUrl } from '../../conf.json';
var today = new Date().toISOString().slice(0, 10);
var linkToToday = "/day/" + today;

const App = ({ children }) => (
  <div>
    <header>
      <h1>Gologme {version}</h1>
      <Link to={linkToToday}>Latest Data</Link>
      <Link to="/overview">Overview</Link>
      <Link to="/about">About</Link>
    </header>
    <section>
      {children || 'Welcome to Gologme'}
    </section>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
