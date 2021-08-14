import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../components/CustomButtons/Button';

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

                <Typography variant="h6" className={classes.title}>
                    Vaptured tError
                </Typography>

                <Button color="transparent" onClick={handlePortalClick}>
                    Portals
                </Button>

                <Button color="transparent" onClick={handleLoginClick}>
                    Login
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export default Nav

