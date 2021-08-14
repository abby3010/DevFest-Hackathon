import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import decode from 'jwt-decode';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import hamburger from '../../images/hamburger.png';
import crossmark from '../../images/crossmark.png';
import './style.css';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" });

        history.push('/auth');
        setUser(null);
    }, [history, dispatch]);

    useEffect(() => {
        const token = user?.token;

        // Check if token is expired
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, user?.token, logout]);

    const handleClick = () => {
        setClick(!click);
    }

    return (
        <div>

            {/* <AppBar className={classnamees.appBar} position="static" color="inherit">
                <div className={classnamees.brandContainer}>
                    <Typography component={Link} to="/" className={classnamees.heading} variant="h4" align="center" >Workosmo</Typography>
                    <img className={classnamees.image} src={logo} alt="icon" height="40" />
                </div>
                <Toolbar className={classnamees.toolbar}>
                    {user ? (
                        <div className={classnamees.profile}>
                            <Avatar className={classnamees.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography className={classnamees.userName} variant="h6" > {user.result.name}</Typography>
                            <Button variant="contained" className={classnamees.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                    )}
                </Toolbar>
            </AppBar> */}

            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo">

                        <NavLink exact to="/">
                            <img className="logo-img" src={logo} alt="logo" />
                        </NavLink>
                    </div>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink exact to="/abb" activeClassName="active" className="nav-links" onClick={handleClick}>
                                About
                            </NavLink>
                        </li>

                        {/* <li className="nav-item">
                            <NavLink exact to="/aa" activeClassName="active" className="nav-links" onClick={handleClick}>
                                Profile
                            </NavLink>
                        </li> */}

                        {user ? (
                            <li className="nav-item">
                                <NavLink exact to="/profile" className="nav-links nav-profile" onClick={handleClick}>
                                    {user.result.imageUrl ?
                                        <img style={{ height: 40, width: 40, borderRadius: 20 }} src={user.result.imageUrl} alt={user.result.name} />
                                        :
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Avatar alt={user.result.firstName} src={user.result.imageUrl}>
                                                {user.result.firstName.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </div>
                                    }
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item login-btn">
                                <NavLink exact to="/auth" activeClassName="active" className="nav-login-btn" onClick={handleClick}>
                                    Login
                                </NavLink>
                            </li>
                        )}

                    </ul>


                    {/* Hamburger menu for responsivness */}
                    <div className="nav-icon" onClick={handleClick}>
                        <img style={{ height: 20, width: 20 }} src={click ? crossmark : hamburger} alt="hamburger" />
                    </div>
                </div>
            </nav>
        </div >
    )
}
export default Navbar;
