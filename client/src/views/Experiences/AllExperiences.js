import React, { useState, useEffect } from 'react'
import * as api from '../../api/index';
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Divider from '@material-ui/core/Divider';
import CardFooter from '../../components/Card/CardFooter';
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
    img: {
        height: '150px',
        width: 'auto',
    },
}));

const AllExperiences = () => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [exps, setExps] = useState([]);

    useEffect(() => {
        api.fetchAllExperiences()
            .then((response) => {
                setExps(response.data);
            })
            .catch((error) => {
                var response = error.response?.data;
                console.error(error)
                setNotif({ open: true, color: "danger", message: response?.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }, []);

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var year = a.getUTCFullYear();
        var time = `${date} ${month}, ${year}`
        return time;
    }

    return (
        <div>

            <GridContainer>
                {
                    exps ?
                        exps.map((exp, val) => {
                            return (
                                <GridItem xs={12} sm={6} md={4}>
                                    <Card key={val}>
                                        <CardHeader color="primary" className={classes.head}>
                                            <Typography variant="body1" gutterBottom>
                                                {exp.title}
                                            </Typography>
                                        </CardHeader>
                                        <CardBody key={exp._id}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {exp.description}
                                            </Typography>
                                            <i><p style={{ marginTop: '10px', color: 'grey', textAlign: 'right' }}>{`- ${exp.creator_name}`}</p></i>
                                            {/* <img src={exp.imageURL} alt={exp.title} className={classes.img}></img> */}
                                            <Divider />
                                        </CardBody>
                                        <CardFooter>
                                            <p style={{ color: 'grey' }}>{timeConverter(exp.createdAt)}</p>
                                            <div style={{display: 'flex'}}>
                                                <PlaceIcon fontSize='small' color='disabled' />
                                                <p style={{ marginLeft: '3px', color: 'grey' }}>{`${exp.country}, ${exp.region}`}</p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            )
                        }) : <p>Loading...</p>
                }
            </GridContainer>
        </div>
    )
}

export default AllExperiences
