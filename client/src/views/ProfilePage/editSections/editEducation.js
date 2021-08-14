import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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
    },
    section: {
        paddingTop: 10,
    }
}));


const EditEducation = (props) => {
    const classes = useStyles();

    const education = props.index > -1 ? props.user.educations[props.index] : null;
    const [institute, setInstitute] = useState();
    const [degree, setDegree] = useState();
    const [startYr, setStartYr] = useState();
    const [endYr, setEndYr] = useState();
    const [branch, setBranch] = useState();
    const [grades, setGrades] = useState();
    const [desc, setDesc] = useState();

    const [branchChange, setBranchChange] = useState(false);
    const [gradeChange, setGradeChange] = useState(false);
    const [descChange, setDescChange] = useState(false);


    useEffect(() => {
        setStartYr(education?.startYr ? education.startYr : Date.now());
        setEndYr(education?.endYr ? education.endYr : Date.now());
    }, [education, props.index, props.user.educations])

    const callDatabase = (educationList) => {
        const profile = JSON.parse(localStorage.getItem("profile")).result;
        props.handleClose();
        let formData = { uid: profile.uid, privateKey: profile.privateKey, educations: educationList };
        api.updateProfileEducations(formData).then((response) => {
            props.successNotification(response);
        }).catch((error) => {
            props.errorNotification(error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const curenteducation = {
            institute: institute ? institute : education?.institute,
            degree: degree ? degree : education.degree,
            startYr: startYr ? startYr : education.startYr,
            endYr: endYr ? endYr : education.endYr,
            branch: branchChange ? branch : branch ? branch : education.branch,
            grades: gradeChange ? grades : grades ? grades : education.grades,
            desc: descChange ? desc : desc ? desc : education.desc,
        }
        var educationList = props.user.educations;
        if (props.index > -1) {


            // Update the values at the given index
            educationList[props.index] = curenteducation;

            props.setUser((prevUser) => (
                {
                    ...prevUser,
                    educations: [...educationList]
                }
            ));
            callDatabase(educationList)
        }
        else {
            // Add the values at the given last index
            props.setUser((prevUser) => (
                {
                    ...prevUser,
                    educations: [...prevUser.educations, curenteducation]
                }
            ));
            callDatabase([...educationList, curenteducation]);
        }
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
                                            id="institute"
                                            className={classes.textfield}
                                            label="Institute name"
                                            variant="outlined"
                                            name="institute"
                                            defaultValue={education?.institute}
                                            onChange={(event) => setInstitute(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="degree"
                                            className={classes.textfield}
                                            label="Degree Name"
                                            variant="filled"
                                            name="degree"
                                            defaultValue={education?.degree}
                                            onChange={(event) => setDegree(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={6}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="branch"
                                            className={classes.textfield}
                                            label="Branch"
                                            variant="outlined"
                                            name="branch"
                                            defaultValue={education?.branch}
                                            onChange={(event) => { setBranchChange(true); setBranch(event.target.value) }}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem xs={12} sm={6}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="grades"
                                            className={classes.textfield}
                                            label="Grades"
                                            variant="outlined"
                                            name="grades"
                                            defaultValue={education?.grades}
                                            onChange={(event) => { setGradeChange(true); setGrades(event.target.value) }}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        />
                                    </FormGroup>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <GridItem xs={12} sm={6} className={classes.section}>
                                        <FormGroup className={classes.section}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="start-year-date-picker-dialog"
                                                label="Start year"
                                                format="yyyy"
                                                views={["year"]}
                                                value={startYr}
                                                onChange={(date) => setStartYr(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                    <GridItem xs={12} sm={6} className={classes.section}>
                                        <FormGroup className={classes.section}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="end-year-date-picker-dialog"
                                                label="End year (or expected)"
                                                format="yyyy"
                                                views={["year"]}
                                                value={endYr}
                                                onChange={(date) => setEndYr(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                </MuiPickersUtilsProvider>
                                <GridItem xs={12} sm={12}>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="description"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            defaultValue={education?.desc}
                                            variant="filled"
                                            onChange={(event) => { setDescChange(true); setDesc(event.target.value) }}
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

export default EditEducation;