import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

import Button from "../../../components/CustomButtons/Button.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import CountryRegionCity from "../../../components/CountryRegionCity/CountryRegionCity.js";

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
    },
    section: {
        paddingTop: 10,
    }
}));


const EditDetails = (props) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [about, setAbout] = useState(props.user.about);
    const [country, setCountry] = useState(props.user.country);
    const [region, setRegion] = useState(props.user.region);
    const [city, setCity] = useState(props.user.city);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const profile = JSON.parse(localStorage.getItem("profile")).result;

        props.handleClose();

        let formData = { uid: profile.uid, privateKey: profile.privateKey, firstName, lastName, about, country, region, city };
        api.updateProfileDetails(formData).then((response) => {
            props.successNotification(response);
            props.setUser((prevUser) => (
                {
                    ...prevUser,
                    firstName: firstName,
                    lastName: lastName,
                    about: about,
                    country: country,
                    region: region,
                    city: city,
                }
            ));
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
                                <GridItem xs={12} sm={6}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="name"
                                            className={classes.textfield}
                                            label="Firstname"
                                            variant="filled"
                                            name="firstname"
                                            value={firstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={6} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="tagline"
                                            className={classes.textfield}
                                            label="Lastname"
                                            variant="filled"
                                            name="lastname"
                                            value={lastName}
                                            onChange={(event) => setLastName(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <CountryRegionCity
                                            country={country}
                                            region={region}
                                            city={city}
                                            setCountry={setCountry}
                                            setRegion={setRegion}
                                            setCity={setCity}
                                        />
                                    </FormGroup>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} className={classes.section}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="about"
                                            label="About"
                                            multiline
                                            rows={4}
                                            defaultValue={props.user.about}
                                            variant="filled"
                                            onChange={(event) => setAbout(event.target.value)}
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

export default EditDetails;