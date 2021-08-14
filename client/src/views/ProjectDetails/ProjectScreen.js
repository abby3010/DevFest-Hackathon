import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/Add';

import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import Muted from "../../components/Typography/Muted.js";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
// import CardFooter from "../../components/Card/CardFooter.js";
// import CardHeader from "../../components/Card/CardHeader.js";

import EditDetails from './editSections/editDetails.js';

import styles from "../../assets/jss/appstyles/views/projectScreen.js";
import * as api from '../../api/index';
import EditDescription from "./editSections/editDescription.js";

const useStyles = makeStyles(styles);

export default function ProjectScreen() {
    const classes = useStyles();
    let { projectID } = useParams();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const user = profile.result.uid;
    const [loading, setLoading] = useState(true);

    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [project, setProject] = useState({});

    // Editing controllers
    const [editDetails, setEditDetails] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    // const [editImage, setEditImage] = useState(false);
    // const [editEducations, setEditEducations] = useState(false);
    // const [eduIndex, setEduIndex] = useState(-1);

    const formatDate = (value) => {
        var date = new Date(value);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    }

    useEffect(() => {
        api.fetchProject({ projectID: projectID, uid: user })
            .then((response) => {
                setProject(response.data.project);
                setLoading(false);
            })
            .catch((error) => {
                var response = error.response?.data;
                setNotif({ open: true, color: "danger", message: response?.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }, [user, projectID]);

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
        if (response?.data.success) {
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
                place="tr"
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
                project={project}
                setProject={setProject}
                errorNotification={errorNotification}
                successNotification={successNotification}
            />

            <EditDescription
                open={editDescription}
                handleClose={() => setEditDescription(false)}
                project={project}
                setProject={setProject}
                errorNotification={errorNotification}
                successNotification={successNotification}
            />

            {/* =========================================================  */}


            <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                    {/*=================== Details Card ===================*/}
                    <Card className={classes.detailCards}>
                        <CardBody>
                            {loading ?
                                <CircularProgress />
                                : <GridContainer>
                                    <GridItem xs={12} sm={6}>
                                        <img
                                            className={classes.projectImage}
                                            src={project.imageLinks[0]}
                                            alt={project.name}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        <h3>{project.name}</h3>
                                        <h5>{project.tagline}</h5>
                                        {project.theme + ' '}<br/>
                                        {formatDate(project.createdAt)}
                                        <Muted>{project.views} Views</Muted>
                                    </GridItem>
                                    <GridItem xs={12} sm={2}>
                                        <div>
                                            <IconButton onClick={() => { setEditDetails(!editDetails) }}> <EditIcon /></IconButton>
                                        </div>
                                    </GridItem>
                                </GridContainer>
                            }
                        </CardBody>
                    </Card>
                    {/*==========================================================================*/}

                    {/*=================== Description Card ===================*/}
                    <Card className={classes.detailCards}>
                        <CardBody>
                            {loading ?
                                <CircularProgress />
                                : <GridContainer>
                                    <GridItem xs={12} sm={10}>
                                        <h4>Description</h4>
                                        {project.description}
                                    </GridItem>
                                    <GridItem xs={12} sm={2}>
                                        <div>
                                            <IconButton onClick={() => { setEditDescription(!editDescription) }}> <EditIcon /></IconButton>
                                        </div>
                                    </GridItem>
                                </GridContainer>
                            }
                        </CardBody>
                    </Card>
                    {/*==========================================================================*/}
                </GridItem>
            </GridContainer>
        </>
    )
}