import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { ServerUrl } from '../../conf.json';
var today = new Date().toISOString().slice(0, 10);
var linkToToday = "/day/" + today;

const muiTheme = getMuiTheme({
});


const App = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
        <header>
            <h1>Gologme {version}</h1>
            <Link to={linkToToday}>
                <RaisedButton
                label="Latest Data"
                primary={true}
                />
            </Link>
            <Link to="/overview">Overview</Link>
            <Link to="/recent">
                <RaisedButton
                label="Recent"
                secondary={true}
                />
            </Link>

        </header>
        <section>

          {children || 'Welcome to Gologme'}
        </section>
    </div>
  </MuiThemeProvider>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
