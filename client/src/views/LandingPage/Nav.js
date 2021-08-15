import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../components/CustomButtons/Button';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    // Check if the user is logged In
    var loggedIn = localStorage.getItem('profile');

    const handleLoginClick = () => {
        if (!loggedIn){
            return history.push("/auth");
        } else {
            return history.push("/app/user");
        }
    }

    const handlePortalClick = () => {
        return history.push("/app/portals");
    }
    return (
        <AppBar position="static">
            <Toolbar>

                <div className={classes.title} >
                    <Button color="transparent" onClick={() => history.push("/")}>
                        <h3> EPINFO</h3>
                    </Button>
                </div>

                <Button color="transparent" onClick={handlePortalClick}>
                    <h4> Portals</h4>
                </Button>

                <Button color="transparent" onClick={handleLoginClick}>
                    {!loggedIn ? <h4> Login</h4> : <h4> My Account</h4>}
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export default Nav

