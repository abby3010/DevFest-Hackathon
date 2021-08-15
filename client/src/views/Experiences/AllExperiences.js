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
import Button from '../../components/CustomButtons/Button';
import { CountryDropdown } from 'react-country-region-selector';
import Pagination from '@material-ui/lab/Pagination';

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
    regionSelector: {
        padding: "12px",
        width: '100%',
        margin: "10px 0",
        borderRadius: "5px",
        background: '#C2F9BB',
        color: 'black',
    },
    button: {
        margin: '10px 0',
        width: '100%'
    }
}));

const AllExperiences = () => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [exps, setExps] = useState([]);
    const [sort, setSort] = useState('');

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

    // eslint-disable-next-line
    const expList = exps.filter((exp) => {
        if (sort === '') {
            return exp
        } else if (sort === exp.category || sort === exp.country) {
            return exp
        }
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(4);

    // get current disease
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage;
    const currentData = expList.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={2} md={4}>
                    <div style={{ margin: '2rem 0' }}>
                        <Typography variant="h5" align="center">SORT</Typography>
                        <Button className={classes.button} color="info" onClick={() => setSort('infopost')}>Info Posts</Button>
                        <Button className={classes.button} color="warning" onClick={() => setSort('experience')}>Experiences</Button>
                        <CountryDropdown className={classes.regionSelector} value={sort} onChange={(val) => setSort(val)} />
                        <Button fullWidth color="transparent" onClick={() => setSort('')}>Clear</Button>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={10} md={8}>
                    <GridContainer>
                        {
                            currentData
                                ? currentData.map((exp, val) => {
                                    return (
                                        <GridItem xs={12} sm={6}>
                                            <Card key={val}>
                                                <CardHeader color={exp.category === 'infopost' ? "info" : 'warning'} className={classes.head}>
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
                                                    <div style={{ display: 'flex' }}>
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
                    <div style={{ margin: '2rem 0' }}>
                        <Pagination count={Math.ceil(expList.length / dataPerPage)} color="primary" page={currentPage} onChange={handleChange} />
                    </div>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default AllExperiences
