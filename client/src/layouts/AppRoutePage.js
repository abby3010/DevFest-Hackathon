import React from "react";
import { Switch, Route } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import appRoutes from "../routes/appRoutes.js";
import styles from "../assets/jss/appstyles/layouts/userAppStyle.js";

import logo from "../assets/img/logo.gif";

import * as api from '../api/index';

const switchRoutes = (routes) => (
  <Switch>
    {routes.map((prop, key) => {

      // var loggedIn = localStorage.getItem('profile');

      // if (loggedIn === null) {
      //   return <Redirect key={key} to="/auth" />;
      // }
      
      if (prop.layout === "/app") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function UserApp({ ...rest }) {

  // styles
  const classes = useStyles();

  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [routes, setRoutes] = React.useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    setRoutes(appRoutes());
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);


  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"EPInfo"}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes(routes)}</div>
        </div>
        <Footer />

      </div>
    </div>
  );
}
