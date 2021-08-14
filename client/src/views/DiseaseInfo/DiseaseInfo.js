import React, { useState } from 'react'
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { diseases } from './diseases';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#D0E9F1',
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
                    onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}}
                />
            </div>
            <GridContainer>
                {
                    currentData.map((key, val) => {
                        return (
                            <GridItem xs={12} sm={6} md={4}>
                                <Card style={{ textAlign: "center" }}>
                                    <div style={{ background: 'lightblue', padding: '0.5rem 0' }}>
                                        <p style={{ fontWeight: 'bold' }}>{key[1]}</p>
                                    </div>
                                    <CardBody>
                                        {key[7]}
                                        <br />
                                    </CardBody>
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
