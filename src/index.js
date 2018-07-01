import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
// import {unregister} from './registerServiceWorker';

ReactDOM.render(<Router><Route component={App} /></Router>, document.getElementById('root'));
// registerServiceWorker();
