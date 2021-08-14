import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

import Button from "../../../components/CustomButtons/Button.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

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
        minWidth: 500,
        [theme.breakpoints.down("sm")]: {
            minWidth: 200,
        },
    },
    section: {
        paddingTop: 10,
    }
}));


const EditDescription = (props) => {
    const classes = useStyles();
    const [description, setDescription] = useState();

    useEffect(() => {
        setDescription(props.project.description)
    }, [props.project])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profile = JSON.parse(localStorage.getItem("profile")).result;

        props.handleClose();

        let formData = { uid: profile.uid, privateKey: profile.privateKey, description: description };
        api.updateProjectDescription(formData).then((response) => {
            props.setProject((prevProject) => (
                {
                    ...prevProject,
                    description: description,
                }
            ));
            props.successNotification(response);
        }).catch((error) => {
            props.errorNotification(error);
        });
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
                                <GridItem xs={12} sm={12} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="description"
                                            label="description"
                                            multiline
                                            rows={4}
                                            value={description}
                                            variant="filled"
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </FormGroup>
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
                            </GridContainer>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </>
    );
}

export default EditDescription;