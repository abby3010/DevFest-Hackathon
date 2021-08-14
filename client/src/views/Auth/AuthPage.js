import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, Checkbox } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from './Input';
import Icon from './googleIcon';
import useStyles from './styles';
import { signUp, login, googleAuth } from '../../redux/auth/actions/auth';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Nav from "../LandingPage/Nav";
import Snackbar from "../../components/Snackbar/Snackbar.js";

const initialFormState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', rememberMe: false };

function Auth() {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [formData, setFormData] = useState(initialFormState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signUp(formData, history, setNotif));
            // setLoggedIn(true);
        } else {
            dispatch(login(formData, history, setNotif));
            // setLoggedIn(true);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleChecked = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }

    const googleAuthSuccess = async (res) => {
        const profile = res?.profileObj;

        const userData = {
            firstName: profile.givenName,
            lastName: profile.familyName,
            email: profile.email,
            imageUrl: profile.imageUrl,
            rememberMe: formData.rememberMe
        };

        try {
            dispatch(googleAuth(userData, history));

        } catch (error) {
            console.log(error);
        }
    }
    const googleAuthFailure = (error) => {
        console.log("Google Auth Failure", error);
    }

    // Check if the user is logged In
    var loggedIn = localStorage.getItem('profile');
    if (loggedIn !== null) {
        return <Redirect key="auth" to="/app/portals" />;
    }

    return (
        <>
            <Snackbar
                place="tr"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />
            <Nav />
            <Container component="main" maxWidth="xs">
                {/* An elevated card like paper from material ui design */}
                <Paper className={classes.paper} elevation={3}>

                    {/* Avatar Symbol */}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon className="" />
                    </Avatar>

                    {/* Heading */}
                    <Typography className="" variant="h5">
                        {isSignUp ? 'SignUp' : 'Login'}
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                // Only if the signup is to be shown
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half={true} />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half={true} />
                                    </>
                                )
                            }

                            {/* Email and Password TextFields */}
                            <Input
                                name="email"
                                label="Email"
                                handleChange={handleChange}
                                type="email" />
                            {/* Password TextField */}
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword} />
                            {
                                isSignUp && <Input
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            }
                        </Grid>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.rememberMe}
                                    onChange={handleChecked}
                                    name="rememberMe"
                                    color="primary"
                                />
                            }
                            label="Remember Me"
                        />

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? "Sign Up" : "Login"}
                        </Button>

                        {/* Google Login Button */}
                        <GoogleLogin
                            clientId="991514692236-5v3a752h2m6m5l2nkrrjinkqh2psfdgu.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Continue with Google
                                </Button>
                            )}
                            onSuccess={googleAuthSuccess}
                            onFailure={googleAuthFailure}
                            cookiePolicy="single_host_origin"
                        />

                        {/* Toggle between Sign Up and Login */}
                        <Grid container justify="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Login"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                </Paper>
            </Container>
        </>
    );
}

export default Auth;