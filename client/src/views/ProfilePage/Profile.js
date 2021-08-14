import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import Muted from "../../components/Typography/Muted.js";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardHeader from "../../components/Card/CardHeader.js";

import * as api from '../../api/index';
import default_profileImage from '../../assets/img/default_profile_image.png';

import styles from "../../assets/jss/appstyles/views/userProfile.js";
import EditDetails from './editSections/editDetails.js';
import EditImage from './editSections/editImage';
import ProjectCards from './displaySections/projectCards.js';
import DisplaySkills from './displaySections/displaySkills.js';
import EditSkills from './editSections/editSkills.js';
import { List, ListItem } from '@material-ui/core';
import EditEducation from './editSections/editEducation.js';

const useStyles = makeStyles(styles);

const ProfilePage = () => {
    const classes = useStyles();
    const localUser = JSON.parse(localStorage.getItem("profile"));
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [loading, setLoading] = useState(true);

    // Editing controllers
    const [editDetails, setEditDetails] = useState(false);
    const [editSkills, setEditSkills] = useState(false);
    const [editImage, setEditImage] = useState(false);
    const [editEducations, setEditEducations] = useState(false);
    const [eduIndex, setEduIndex] = useState(-1);

    // State Variables
    const [user, setUser] = useState({
        firstName: localUser.result.firstName,
        lastName: localUser.result.lastName,
    });

    useEffect(() => {
        api.fetchUserData({ uid: localUser.result.uid, privateKey: localUser.result.privateKey })
            .then((response) => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch((error) => {
                var response = error.response?.data;
                setNotif({ open: true, color: "danger", message: response?.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });


        // setLocalUser(JSON.parse(localStorage.getItem("profile")));
    }, [localUser.result.uid, localUser.result.privateKey]);

    const errorNotification = (error) => {
        setLoading(false);
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

    const dateToMonthYear = (date) => {
        date = new Date(date);
        return date.getFullYear();
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

            <EditSkills
                open={editSkills}
                handleClose={() => setEditSkills(false)}
                user={user}
                setUser={setUser}
                errorNotification={errorNotification}
                successNotification={successNotification}
            />

            <EditEducation
                open={editEducations}
                index={eduIndex}
                handleClose={() => setEditEducations(false)}
                user={user}
                setUser={setUser}
                errorNotification={errorNotification}
                successNotification={successNotification}
            />
            {/*=========================================================================*/}


            <GridContainer>
                {/*=================== Profile Card ===================*/}
                <GridItem xs={12} sm={12} md={2}>
                    <Card>
                        <CardHeader className={classes.image}>
                            {loading ?
                                <CircularProgress />
                                : user.imageUrl ?
                                    <img
                                        className={classes.profileImage}
                                        src={user.imageUrl}
                                        alt="Profile"
                                    /> :
                                    <img
                                        className={classes.profileImage}
                                        src={default_profileImage}
                                        alt="Profile"
                                    />

                            }
                        </CardHeader>
                        <CardBody profile className={classes.profileBody}>
                            <h4>{user.firstName + " " + user.lastName}</h4>
                        </CardBody>
                        <CardFooter className={classes.profileFooter}>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span"
                                    onClick={() => { setEditImage(!editImage); }}>
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </CardFooter>
                    </Card>
                </GridItem>
                {/*==========================================================================*/}


                <GridItem xs={12} sm={12} md={8}>

                    {/*=================== Details Card ===================*/}
                    <Card className={classes.detailCards}>
                        <CardBody>
                            {loading ?
                                <CircularProgress />
                                : <GridContainer>
                                    <GridItem xs={12} sm={10}>
                                        <h3>{user.firstName + " " + user.lastName}</h3>
                                        <Muted>{user.city + ", " + user.region + ", " + user.country}</Muted>
                                    </GridItem>
                                    <GridItem xs={12} sm={2}>
                                        <div>
                                            <IconButton onClick={() => { setEditDetails(!editDetails) }}> <EditIcon /></IconButton>
                                        </div>
                                    </GridItem>
                                </GridContainer>
                            }
                            <h4>About</h4>
                            <p>{user.about}</p>
                        </CardBody>

                    </Card>
                    {/*==========================================================================*/}

                    {/*=================== Skills Card ===================*/}
                    <Card className={classes.detailCards}>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={10}>
                                    <div className={classes.cardTitle}>
                                        <h4>Skills</h4>
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={2}>
                                    <div>
                                        <IconButton onClick={() => { setEditSkills(!editSkills) }}> <AddIcon /></IconButton>
                                    </div>
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={10}>
                                    {loading ?
                                        <CircularProgress />
                                        :
                                        <DisplaySkills skills={user.skills} />
                                    }
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                    </Card>
                    {/*==========================================================================*/}

                    {/*=================== Education Card ===================*/}
                    <Card className={classes.detailCards}>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={10}>
                                    <div className={classes.cardTitle}>
                                        <h4>Education</h4>
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={2}>
                                    <div>
                                        <IconButton onClick={() => { setEduIndex(-1); setEditEducations(!editEducations) }}> <AddIcon /></IconButton>
                                    </div>
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={10}>
                                    {loading ?
                                        <CircularProgress />
                                        :
                                        <List>
                                            {user.educations?.length < 1 ?
                                                <p>Add your education journey. School, college, degree...</p> :
                                                user.educations?.map((education, index) => (
                                                    <ListItem key={index} className={classes.education}>
                                                        <GridContainer style={{ width: '100%' }}>
                                                            <GridItem xs={12} sm={10}>
                                                                <div>
                                                                    <h5>{education.degree + (education.branch ? ', ' + education.branch : '')}</h5>
                                                                    <p>{education.institute + (education.grades ? ', ' + education.grades : '')}</p>
                                                                    <p>{dateToMonthYear(education.startYr) + ' - '
                                                                        + dateToMonthYear(education.endYr)}</p>
                                                                    {education.desc ? <Muted> {education.desc}</Muted> : ''}
                                                                </div>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={2}>
                                                                <div>
                                                                    <IconButton onClick={() => { setEduIndex(index); setEditEducations(!editEducations) }}> <EditIcon /></IconButton>
                                                                </div>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </ListItem>
                                                ))}
                                        </List>
                                    }
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                    </Card>
                    {/*==========================================================================*/}

                    {/*=================== Projects Card ===================*/}
                    <Card className={classes.detailCards}>
                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={10}>
                                    <div className={classes.cardTitle}>
                                        <h4>Projects</h4>
                                    </div>
                                    <Muted><i>Unlisted projects will not be visible to others.</i></Muted>
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={10}>
                                    {loading ?
                                        <CircularProgress />
                                        :
                                        <ProjectCards projects={user.projects} />
                                    }
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                    </Card>
                    {/*==========================================================================*/}
                </GridItem>

            </GridContainer>
        </>
    );

}

export default ProfilePage;