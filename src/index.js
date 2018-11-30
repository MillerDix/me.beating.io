import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.js';
import {Router, Route} from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
// import {unregister} from './registerServiceWorker'; 
import createBrowserHistory from "history/createBrowserHistory";

const customHistory = createBrowserHistory();
customHistory.listen((location, action) => {
  setTimeout(() => {
    // if(action === 'POP') { return; }
    window.scrollTo(0, 0);
  }, 0);
})

ReactDOM.render(<Router history={customHistory}><Route component={App} /></Router>, document.getElementById('root'));
// registerServiceWorker();
