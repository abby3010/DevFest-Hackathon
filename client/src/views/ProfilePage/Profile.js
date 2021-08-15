import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import Button from "../../components/CustomButtons/Button.js";
import Muted from "../../components/Typography/Muted.js";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

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
                <GridContainer className={classes.container}>
                    <GridItem xs={12} sm={3}></GridItem>
                    <GridItem xs={12} sm={6} md={4}>
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

                        <Button style={{ float: "left" }} color="rose" round onClick={() => { setEditImage(!editImage); }}>
                            <PhotoCamera /> Edit Image
                        </Button>
                        <Button style={{ float: "right" }} color="rose" round onClick={() => { setEditDetails(!editDetails) }}>
                            <EditIcon /> Edit Profile
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        </>
    );

}

export default ProfilePage;