import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from "../../../components/CustomButtons/Button.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import SelectMenu from '../../../components/SelectMenu/SelectMenu';

import * as api from '../../../api/index';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: 500
    },
    section: {
        paddingTop: 10,
    },
    imageLabel: {
        marginTop: "10px",
        fontSize: 15,
        fontStyle: "bold"
    },
    imagePreview: {
        display: "block",
        width: "100%",
        height: "250px",
        objectFit: "contain",
    },
    selectImage: {
        marginTop: "10px",
        border: "1px solid #DEDEDE",
        borderRadius: "5px",
        padding: "10px",
    }
}));


const EditDetails = (props) => {
    const classes = useStyles();
    const [projectName, setProjectName] = useState();
    const [tagline, setTagline] = useState();
    const [theme, setTheme] = useState();
    const [projectImageLogo, setProjectImageLogo] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProjectName(props.project.name);
        setTagline(props.project.tagline);
        setTheme(props.project.theme);
    }, [props.project]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profile = JSON.parse(localStorage.getItem("profile")).result;

        var formData = new FormData();
        formData.append("uid", profile.uid);
        formData.append("privateKey", profile.privateKey);
        formData.append("projectID", props.project._id);
        formData.append("name", projectName);
        formData.append("tagline", tagline);
        formData.append("theme", theme);
        formData.append("image", projectImageLogo);

        setLoading(true);
        api.updateProjectDetails(formData).then((response) => {

            props.setProject((prevProject) => (
                {
                    ...prevProject,
                    name: projectName,
                    tagline: tagline,
                    theme: theme,
                    imageLinks: response?.data.imageLinks,
                }
            ));
            setLoading(false);
            props.successNotification(response);
        }).catch((error) => {
            setLoading(false);
            props.errorNotification(error);
        });

        props.handleClose();

    }
    return (
        <>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.paper}>

                            <GridContainer>
                                <GridItem xs={12} sm={12}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="name"
                                            className={classes.textfield}
                                            label="Project Name"
                                            variant="filled"
                                            name="project name"
                                            value={projectName}
                                            onChange={(event) => setProjectName(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={12} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="tagline"
                                            className={classes.textfield}
                                            label="Tagline"
                                            variant="filled"
                                            name="tagline"
                                            value={tagline}
                                            onChange={(event) => setTagline(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={12} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        Select Theme
                                        <SelectMenu
                                            label="Select Theme"
                                            value={theme}
                                            handleChange={(event) => setTheme(event.target.value)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            items={["Group Project", "Portfolio", "Personal Project"]}
                                        />
                                    </FormGroup>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <div className={classes.imageLabel}> Project Logo </div>
                                    <div className={classes.selectImage}>
                                        <input
                                            type="file"
                                            id="projectImage"
                                            accept="image/*"
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            onChange={event => {
                                                const file = event.target.files[0];
                                                setProjectImageLogo(file);
                                            }} />
                                        {projectImageLogo ?
                                            <img src={URL.createObjectURL(projectImageLogo)} className={classes.imagePreview} alt="project-logo" />
                                            : props.project.imageLinks ?
                                                <img
                                                    className={classes.imagePreview}
                                                    src={props.project.imageLinks[0]}
                                                    alt="Project logo"
                                                /> : null
                                        }
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={4} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <Button color="info" type="submit">Save</Button>
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={4} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <Button color="danger" onClick={() => props.handleClose()}>Cancel</Button>
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={4} >
                                    {loading ? <CircularProgress /> : null}
                                </GridItem>
                            </GridContainer>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </>
    );
}

export default EditDetails;