import React, { useState, useEffect } from 'react';

import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import DialogBox from '../../components/DialogBox/DialogBox';
import SelectMenu from '../../components/SelectMenu/SelectMenu';
import DataListInput from '../../components/DataListInput/DataListInput.js';

import { makeStyles } from "@material-ui/core/styles";
import Check from "@material-ui/icons/Check";
import LinkIcon from '@material-ui/icons/Link';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//core components
import Checkbox from "@material-ui/core/Checkbox";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';

import styles from "../../assets/jss/appstyles/views/userprojects.js";
import checkboxAndRadioStyles from "../../assets/jss/appstyles/checkboxAdnRadioStyle.js";

import * as api from '../../api/index';

const useStyles = makeStyles(styles);
const checkboxStyles = makeStyles(checkboxAndRadioStyles);

// const initialFormState = {
//     name: '',
//     tagline: '',
//     description: '',
//     theme: "Personal Project",
//     tags: [],
//     links: [],
//     owner: null,
//     isUnlisted: false,
// };

// formState = {
//     name: name,
//     tagline: tagline,
//     description: desc,
//     theme: theme,
//     tags: tags,
//     links: links,
//     owner: owner,
//     isUnlisted: isUnlisted,
// };

const NewProject = (props) => {
    const classes = useStyles();
    const checkboxClasses = checkboxStyles();
    const [isUnlisted, setIsUnlisted] = useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [theme, setTheme] = useState("Personal Project");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [tagline, setTagline] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsuggestions, setTagsuggestions] = useState([]);
    const [links, setLinks] = useState([]);
    const [projectImageLogo, setProjectImageLogo] = useState();

    const [newTags, setNewTags] = useState([]);

    const MAX_LINKS = 5;
    const MAX_TAGS = 5;

    useEffect(() => {

        async function fetchData() {
            var data = await api.getHashTags();
            setTagsuggestions(data.data.tags);
        }

        fetchData();

    }, []);


    const handleSubmit = async (event) => {

        event.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("tagline", tagline);
        formData.append("description", desc);
        formData.append("theme", theme);
        formData.append("tags", tags);
        formData.append("newTags", newTags);
        formData.append("links", links);
        formData.append("owner", props.user);
        formData.append("isUnlisted", isUnlisted);
        formData.append("image", projectImageLogo);

        api.createNewProject(formData)
            .then(function (response) {
                props.setNotif({ open: true, color: "success", message: response.data.message });
                setTimeout(function () {
                    props.setNotif({ open: false, message: "" });
                }, 5000);
            })
            .catch(function (error) {
                var response = error.response.data;
                props.setNotif({ open: true, color: "danger", message: "Project not created! " + response.message });
                setTimeout(function () {
                    props.setNotif({ open: false, message: "" });
                }, 5000);
            });

        props.handleToggleState();
    }


    const isURL = (str) => {
        return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(str);
    }

    const handleLinksChange = (event, newValue) => {
        if (links.length > (MAX_LINKS - 1)) {
            props.setNotif({ open: true, color: "warning", message: "Upto 5 links are allowed only!" });
            setTimeout(function () {
                props.setNotif({ open: false, message: "" });
            }, 5000);
        } else {
            if (newValue !== null) {
                if (isURL(newValue)) {
                    if (typeof newValue === 'string') {
                        setLinks([...links, newValue]);
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setLinks([...links, newValue.inputValue]);
                    } else {
                        setLinks([...links, newValue]);
                    }
                }
                else {
                    props.setNotif({ open: true, color: "danger", message: "Not a valid link! Try adding http:// or https:// in the beginning." });
                    setTimeout(function () {
                        props.setNotif({ open: false, message: "" });
                    }, 5000);
                }
            }
        }
    }

    const handleTagsChange = (event, newValue) => {
        if (tags.length > (MAX_TAGS - 1)) {
            props.setNotif({ open: true, color: "warning", message: "Upto 5 tags are allowed only!" });
            setTimeout(function () {
                props.setNotif({ open: false, message: "" });
            }, 5000);
        } else {
            if (newValue !== null) {
                if (typeof newValue === 'string') {
                    setTags([...tags, newValue.toLowerCase()]);
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setTags([...tags, newValue.inputValue.toLowerCase()]);
                    setNewTags([...newTags, newValue.inputValue.toLowerCase()]);
                } else {
                    setTags([...tags, newValue.toLowerCase()]);
                }
            }
        }
    }

    const handleRemoveTag = (index) => {
        if (index !== -1) {
            const newTags = tags.filter((tag) => tags.indexOf(tag) !== index);
            setTags(newTags);
        }
    }

    const handleRemoveLink = (index) => {
        if (index !== -1) {
            const newLinks = links.filter((link) => links.indexOf(link) !== index);
            setLinks(newLinks);
        }
    }

    const handleDialogToggle = () => {
        setDialogOpen(!dialogOpen);
    };

    const handleIsUnlisted = () => {
        setIsUnlisted(!isUnlisted);
    };

    const handleTheme = (event) => {
        setTheme(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleTagline = (event) => {
        setTagline(event.target.value);
    };

    const handleDesc = (event) => {
        setDesc(event.target.value);
    };

    return (
        <>
            <DialogBox
                actions={[
                    {
                        btnText: "Yes",
                        onClick: props.handleToggleState,
                        btnColor: "primary",
                    },
                    {
                        btnText: "No",
                        onClick: handleDialogToggle,
                        btnColor: "primary",
                    },
                ]}
                open={dialogOpen}
                onClose={handleDialogToggle}
                title={"Really want to cancel?"}
                content={"All the data filled would be gone!"}
            />
            <form className={classes.root} onSubmit={handleSubmit} >
                <GridContainer>
                    <GridItem xs={12} sm={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>New Project</h4>
                                <p className={classes.cardCategoryWhite}>Details about the new project</p>
                            </CardHeader>

                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6} className={classes.section}>
                                        <FormGroup>
                                            <TextField
                                                id="project-name"
                                                className={classes.textfield} c
                                                label="Project Name"
                                                variant="filled"
                                                name="name"
                                                onChange={handleName}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <TextField
                                                id="tagline"
                                                className={classes.textfield}
                                                label="Tagline"
                                                variant="filled"
                                                name="tagline"
                                                onChange={handleTagline}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>

                                        Select Theme
                                        <SelectMenu
                                            label="Select Theme"
                                            value={theme}
                                            handleChange={handleTheme}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            items={["Group Project", "Portfolio", "Personal Project"]}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
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
                                                : null
                                            }
                                        </div>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <DataListInput
                                            className={classes.datalistInput}
                                            onChange={(event, newValue) => handleTagsChange(event, newValue)}
                                            options={tagsuggestions}
                                            label={"Enter Tags (upto 5)"}
                                        />
                                        <List dense={true} className={classes.list}>

                                            {tags.map((tag, index) => {
                                                return (
                                                    <ListItem key={index} className={classes.listItem}>
                                                        <ListItemAvatar>
                                                            <i className="material-icons">#</i>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={tag} secondary={"Tag " + (index + 1)} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveTag(index)}>
                                                                <HighlightOffIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })}

                                        </List>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <DataListInput
                                            className={classes.datalistInput}
                                            onChange={(event, newValue) => handleLinksChange(event, newValue)}

                                            options={[]}
                                            label={"Enter Links (upto 5)"}
                                        />
                                        <List dense={true} className={classes.list}>
                                            {links.map((link, index) => {
                                                return (
                                                    <ListItem key={index} className={classes.listItem}>
                                                        <ListItemAvatar>
                                                            <LinkIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={link} secondary={"Link " + (index + 1)} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveLink(index)}>
                                                                <HighlightOffIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })}

                                        </List>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Checkbox
                                            checked={isUnlisted}
                                            tabIndex={-1}
                                            onClick={() => handleIsUnlisted()}
                                            checkedIcon={<Check className={checkboxClasses.checkedIcon} />}
                                            icon={<Check className={checkboxClasses.uncheckedIcon} />}
                                            classes={{
                                                checked: checkboxClasses.checked,
                                                root: checkboxClasses.root
                                            }}s
                                            name="isUnlisted"
                                        />
                                                Make this project <b>Unlisted</b>? The project will <b>not</b> be displayed on your public profile.
                                                It will be visible to only those who have the link to this project.
                                            </GridItem>

                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormGroup>
                                            <TextField
                                                id="description"
                                                label="Description of the project"
                                                variant="filled"
                                                multiline={true}
                                                rows="5"
                                                name="description"
                                                onChange={handleDesc}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="success" type="submit" round>Create</Button>
                                        <Button color="warning" onClick={handleDialogToggle} round>Cancel</Button>
                                    </GridItem>
                                </GridContainer>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </form>
        </>
    );
}

export default NewProject;