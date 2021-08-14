import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './views/Auth/AuthPage';
import LandingPage from './views/LandingPage/LandingPage';
import './App.css';
import './Main.css';
import UserApp from './layouts/AppRoutePage';
import SetProfile from './views/SetProfile/SetProfile';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Portals from './views/Portals/Portals';


const font = "'Questrial', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  }
});

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <MuiThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/auth" component={Auth} />
            <Route path="/app" component={UserApp} />
            <Route path="/setProfile" exact component={SetProfile} />
            <Route path="/portals" exact component={Portals} />
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
