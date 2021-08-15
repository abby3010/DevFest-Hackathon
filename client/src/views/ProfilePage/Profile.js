import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import Button from "../../components/CustomButtons/Button.js";
import Muted from "../../components/Typography/Muted.js";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Divider from '@material-ui/core/Divider';

import * as api from '../../api/index';
import default_profileImage from '../../assets/img/default_profile_image.png';

import styles from "../../assets/jss/appstyles/views/userProfile.js";
import EditDetails from './editSections/editDetails.js';
import EditImage from './editSections/editImage';
const useStyles = makeStyles(styles);

const ProfilePage = () => {
    const classes = useStyles();
    const localUser = JSON.parse(localStorage.getItem("profile"));
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    // Editing controllers
    const [editDetails, setEditDetails] = useState(false);
    const [editImage, setEditImage] = useState(false);

    // State Variables
    const [user, setUser] = useState({
        firstName: localUser.result.firstName,
        lastName: localUser.result.lastName,
    });

    const [exps, setExps] = useState([]);

    useEffect(() => {
        api.fetchAllExperiences()
            .then((response) => {
                setExps(response.data);
            })
            .catch((error) => {
                var response = error.response?.data;
                console.error(error)
                setNotif({ open: true, color: "danger", message: response?.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }, []);

    useEffect(() => {
        api.fetchUserData({ uid: localUser.result.uid, privateKey: localUser.result.privateKey })
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((error) => {
                var response = error.response?.data;
                setNotif({ open: true, color: "danger", message: response?.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }, [localUser.result.uid, localUser.result.privateKey]);

    const errorNotification = (error) => {
        var response = error.response?.data;
        setNotif({ open: true, color: "danger", message: response?.message ? response.message : "Something went wrong!" });
        setTimeout(function () {
            setNotif({ open: false, message: "" });
        }, 5000);
    }

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var year = a.getUTCFullYear();
        var time = `${date} ${month}, ${year}`
        return time;
    }

    const successNotification = (response) => {
        var data = response?.data;
        if (response.data.success) {
            setNotif({ open: true, color: "success", message: data.message });
            setTimeout(function () {
                setNotif({ open: false, message: "" });
            }, 5000);
        } else {
            setNotif({ open: true, color: "danger", message: data.message ? data.message : "Something went wrong! Refresh the page and try again." });
            setTimeout(function () {
                setNotif({ open: false, message: "" });
            }, 5000);
        }
    }

    return (
        <>
            <Snackbar
                place="bl"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />

            {/*=================== Editors =================== */}

            <EditDetails
                open={editDetails}
                handleClose={() => setEditDetails(false)}
                user={user}
                setUser={setUser}
                errorNotification={errorNotification}
                successNotification={successNotification}
            />

            <EditImage
                open={editImage}
                handleClose={() => setEditImage(false)}
                imageUrl={user.imageUrl}
                setUser={setUser}
                errorNotification={errorNotification}
                successNotification={successNotification}
            />
            {/*=========================================================================*/}
            <div style={{ margin: '2rem 0' }}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <GridContainer className={classes.container}>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card profile>
                                    <CardAvatar profile>
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img src={user.imageUrl ? user.imageUrl : default_profileImage} alt="..." />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <h3 className={classes.cardCategory}>
                                            {user.firstName + " " + user.lastName}
                                        </h3>
                                        <Muted>{user.city + ", " + user.region + ", " + user.country}</Muted>

                                    </CardBody>
                                    <CardFooter chart>
                                        <div className={classes.stats}>
                                            <p>{user.about}</p>
                                        </div>
                                    </CardFooter>
                                </Card>

                                <Button color="rose" className={classes.button} onClick={() => { setEditImage(!editImage); }}>
                                    <PhotoCamera /> Edit Image
                                </Button>
                                <Button color="rose" className={classes.button} onClick={() => { setEditDetails(!editDetails) }}>
                                    <EditIcon /> Edit Profile
                                </Button>
                                <br />
                                <br />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                            {
                                exps.filter(exp => exp.creator_id === localUser.result.uid).length > 0
                                    ? exps.filter(exp => exp.creator_id === localUser.result.uid).map((exp, val) => {
                                        return (
                                            <GridItem xs={12} sm={6}>
                                                <Card key={val}>
                                                    <CardHeader color={exp.category === 'infopost' ? "info" : 'warning'} className={classes.head}>
                                                        <Typography variant="body1" gutterBottom>
                                                            {exp.title}
                                                        </Typography>
                                                    </CardHeader>
                                                    <CardBody key={exp._id}>
                                                        <Typography variant="subtitle1" gutterBottom>
                                                            {exp.description}
                                                        </Typography>
                                                        {/* <img src={exp.imageURL} alt={exp.title} className={classes.img}></img> */}
                                                        <Divider />
                                                    </CardBody>
                                                    <CardFooter>
                                                        <p style={{ color: 'grey' }}>{timeConverter(exp.createdAt)}</p>
                                                    </CardFooter>
                                                </Card>
                                            </GridItem>
                                        )
                                    }) : <p style={{padding: '2rem', textAlign: 'center'}}>Your posts appear here!</p>
                            }
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        </>
    );

}

export default ProfilePage;