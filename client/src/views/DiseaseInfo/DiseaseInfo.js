import React, { useState } from 'react'
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import GridContainer from "../../components/Grid/GridContainer";
import Muted from "../../components/Typography/Muted";
import GridItem from "../../components/Grid/GridItem";
import { diseases } from './diseases';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'lightblue',
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const DiseaseInfo = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const diseaseList = diseases["data"].filter(dis => dis[7] !== null).filter(dis => dis[1].toLowerCase().includes(searchTerm.toLowerCase()));

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(9);

    // get current disease
    const indexOfLastDisease = currentPage * dataPerPage;
    const indexOfFirstDisease = indexOfLastDisease - dataPerPage;
    const currentData = diseaseList.slice(indexOfFirstDisease, indexOfLastDisease);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const classes = useStyles();

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                />
            </div>
            <GridContainer>
                {
                    currentData.map((key, val) => {
                        return (
                            <GridItem xs={12} sm={6} md={4} key={key}>
                                <Card style={{ textAlign: "center" }}>
                                    <div style={{ background: '#008DC9', color: '#FFFFFF', padding: '0.5rem 0' }}>
                                        <Typography variant="h6" align="center">{key[1]}</Typography>
                                    </div>
                                    <CardBody className="dis-car" style={{height: '300px', overflowY: 'auto'}}>
                                        <Muted>Description</Muted>
                                        {key[7]}
                                        <br />
                                        <br />
                                        <Divider />
                                        <br />
                                        <Muted>Synonyms</Muted>
                                        {key[5]}
                                    </CardBody>
                                    <CardFooter>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        )
                    })
                }
            </GridContainer>
            <div style={{ margin: '2rem 0' }}>
                <Pagination count={Math.ceil(diseaseList.length / dataPerPage)} color="primary" page={currentPage} onChange={handleChange} />
            </div>
        </div>
    )
}

export default DiseaseInfo
