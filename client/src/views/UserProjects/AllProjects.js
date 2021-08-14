import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from "../../components/CustomButtons/Button.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardHeader from "../../components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LinkOffIcon from '@material-ui/icons/LinkOff';

import styles from "../../assets/jss/appstyles/views/userprojects.js";
import * as api from '../../api/index';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(styles);

const AllProjects = (props) => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        async function fetchData() {
            var userData = { "uid": props.user }
            var projectResult = await api.getUserProjects(userData);
            setProjects(projectResult.data.projects)
        }

        fetchData();

    }, [props.user]);

    const formatDate = (value) => {
        var date = new Date(value);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    }


    return (
        <>
            <GridContainer className={classes.searchWrapper}>
                <GridItem xs={12} sm={12} >

                    {/* Search Input */}
                    <CustomInput
                        style={{ backgroundColor: "#000000" }}
                        formControlProps={{
                            className: classes.margin + " " + classes.search
                        }}
                        inputProps={{
                            placeholder: "Search",
                            inputProps: {
                                variant: "outlined",
                                "aria-label": "Search",
                            },
                        }}
                    />
                    <Button color="white" aria-label="edit" justIcon round>
                        <Search />
                    </Button>

                    {/* Add New User Project Button */}
                    <Button className={classes.newProjectBtn} onClick={props.handleToggleState} color="primary" round><AddCircleIcon /> New Project</Button>

                </GridItem>
            </GridContainer>
            <GridContainer>
                {projects.length === 0 ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody>
                                No projects yet! Create a new project.
                        </CardBody>
                        </Card>
                    </GridItem>
                    :
                    projects.map((project) => {
                        return (
                            <GridItem key={project._id} xs={12} sm={12} md={3} >
                                <Link to={"/app/project/" + project._id}>
                                    <Card>
                                        <CardHeader>
                                            <img
                                                className={classes.projectImgLogo}
                                                src={project.imageLinks[0]}
                                                alt={project.name}
                                            />
                                        </CardHeader>
                                        <CardBody className={classes.projectCard}>

                                            <h4 className={classes.projectName}>{project.name}</h4>
                                            <p className={classes.tagline}>
                                                {
                                                    project.tagline.length > 80 ?
                                                        project.tagline.slice(0, 80) + "..."
                                                        : project.tagline
                                                }
                                            </p>
                                        </CardBody>
                                        <CardFooter>
                                            {formatDate(project.createdAt)}
                                            {
                                                project.isUnlisted ?
                                                    <Tooltip title="Unlisted" aria-label="Unlisted"  placement="top">
                                                        <LinkOffIcon />
                                                    </Tooltip>
                                                    : null
                                            }
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </GridItem>
                        );
                    })

                }
            </GridContainer>

        </>
    );
}

export default AllProjects;