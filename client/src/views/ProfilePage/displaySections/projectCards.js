import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import CardHeader from "../../../components/Card/CardHeader.js";

import LinkOffIcon from '@material-ui/icons/LinkOff';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        minWidth: 250,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    section: {
        paddingTop: 10,
    },
    projectImgLogo: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "5px",
    },
}));

const ProjectCards = (props) => {
    const classes = useStyles();

    const formatDate = (value) => {
        var date = new Date(value);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    }
    return (
        <>
            {
                props.projects.length === 0 ?
                    <p>No projects found! You can create a new project in <b>My Projects</b> section.</p>
                    :
                    <GridContainer>
                        {props.projects.map(project => {
                            return (
                                <GridItem key={project._id} xs={12} sm={12} md={4} >
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
                            )
                        })}
                    </GridContainer>
            }
        </>
    );
}

export default ProjectCards;