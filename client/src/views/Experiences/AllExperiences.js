import React, { useState, useEffect } from 'react'
import * as api from '../../api/index';
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from '../../components/CustomButtons/Button';
import { CountryDropdown } from 'react-country-region-selector';
import Pagination from '@material-ui/lab/Pagination';
import ExperienceCard from './ExperienceCard';
import Snackbar from "../../components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";

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
        borderRadius: "25px",
        // background: '#C2F9BB',
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.fetchAllExperiences()
            .then((response) => {
                setExps(response.data);
                setLoading(false);
            })
            .catch((error) => {
                var response = error.response?.data;
                console.error(error)
                setNotif({ open: true, color: "danger", message: response?.message ?? "Something went wrong" });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }, []);

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
    const currentData = expList?.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <Snackbar
                place="tr"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />
            <GridContainer>
                <GridItem xs={12} sm={3}>
                    <div style={{ margin: '2rem 0' }}>
                        <Typography variant="h5" align="center">SORT</Typography>
                        <Button className={classes.button} round color="info" onClick={() => setSort('infopost')}>Info Posts</Button>
                        <Button className={classes.button} round color="warning" onClick={() => setSort('experience')}>Experiences</Button>
                        <CountryDropdown className={classes.regionSelector} value={sort} onChange={(val) => setSort(val)} />
                        <Button fullWidth color="transparent" onClick={() => setSort('')}>Clear</Button>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={9}>
                    <GridContainer>
                        {loading ? <CircularProgress align="center"/> :
                            currentData
                                ? currentData.map((exp, val) => {
                                    return (
                                        <ExperienceCard exp={exp} key={val} />
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
