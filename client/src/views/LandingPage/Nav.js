import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    links: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    }
}));

const Nav = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Vaptured tError
                    </Typography>
                    <Typography variant="subtitle1" className={classes.links}>
                        Portals
                    </Typography>
                    <Typography variant="subtitle1" className={classes.links}>
                        Login
                    </Typography>
                </Toolbar>
            </AppBar>
    )
}

export default Nav

