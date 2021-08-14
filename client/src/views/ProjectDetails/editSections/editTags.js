import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import Button from "../../../components/CustomButtons/Button.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Muted from "../../../components/Typography/Muted.js";

import * as api from '../../../api/index';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        minWidth: 250,
        maxWidth: 550,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    section: {
        paddingTop: 10,
    },
    skills: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const EditTags = (props) => {
    const classes = useStyles();
    const [tags, setTags] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const profile = JSON.parse(localStorage.getItem("profile")).result;

        props.handleClose();

        let formData = { uid: profile.uid, privateKey: profile.privateKey, skills: tags };
        api.updateProfileSkills(formData).then((response) => {
            props.successNotification(response);
            props.setProject((prevUser) => (
                {
                    ...prevUser,
                    tags: tags,
                }
            ));
        }).catch((error) => {
            props.errorNotification(error);
        });
    }

    const buildSkillsTags = (string) => {
        if (string !== null) {
            var skillList = string.split(',').map(item => item.trim());
            if (skillList[skillList.length - 1] === '') skillList.pop();
            setTags(skillList);
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
                                    <p>One's skills are precious and we do not want to restrict them to few suggestions. <br />
                                    You are free to put whatever skills you may posses!😃</p>
                                    <FormGroup className={classes.section}>
                                        <TextField
                                            id="name"
                                            className={classes.textfield}
                                            variant="outlined"
                                            name="skills"
                                            multiline
                                            defaultValue={props.user.skills?.join(', ')}
                                            onChange={(event) => buildSkillsTags(event.target.value)}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            required
                                        />
                                    </FormGroup>
                                    <Muted>Enter comma separated skills</Muted>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12}>
                                    <div className={classes.skills}>
                                        {tags.map((sk, key) => {
                                            return <Chip
                                                key={key}
                                                label={sk}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        })}
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
                            </GridContainer>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </>
    );
}

export default EditTags;