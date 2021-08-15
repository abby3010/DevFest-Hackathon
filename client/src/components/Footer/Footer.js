/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/jss/appstyles/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/app/portals" className={classes.block}>
                Portals
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/app/diseases" className={classes.block}>
                Diseases
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/app/forum" className={classes.block}>
                Forum
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            {1900 + new Date().getYear()}{" "}
              Epinfo - for modernised epidemiological studies.
          </span>
        </p>
      </div>
    </footer>
  );
}
