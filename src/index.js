import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Link } from 'react-router-dom'
import App from './layout/App';
import reportWebVitals from './reportWebVitals';


function home() {
  return(
    <Link to="/covid-19-tracker">
      <button>Redirect</button>
    </Link>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Route exact path="/" component={home} />
      <Route exact path="/covid-19-tracker" component={App} />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
