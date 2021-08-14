import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './views/Auth/AuthPage';
import LandingPage from './views/LandingPage/LandingPage';
import './App.css';
import UserApp from './layouts/AppRoutePage';
import SetProfile from './views/SetProfile/SetProfile';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/auth" component={Auth} />
          <Route path="/app" component={UserApp} />
          <Route path="/setProfile" exact component={SetProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
