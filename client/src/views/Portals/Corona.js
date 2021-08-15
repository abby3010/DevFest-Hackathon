/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import AddAlert from "@material-ui/icons/AddAlert";
import Chart from "react-google-charts";

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import Snackbar from "../../components/Snackbar/Snackbar.js";

import { getCoronaDataCountrywise } from '../../api';
import { Divider, Typography } from '@material-ui/core';

export default function CoronaPortal() {
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [countrywiseData, setCountrywiseData] = useState();
    const [activeCases, setActiveCases] = useState();
    const [newCases, setNewCases] = useState();
    const [newDeaths, setNewDeath] = useState();
    const [totalCases, setTotalCases] = useState();
    const [totalDeaths, setTotalDeath] = useState();
    const [totalRecoveredCases, setTotalRecoveredCases] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let response = await getCoronaDataCountrywise();
            if (response.data !== null) {
                setCountrywiseData(response.data);
                setActiveCases(response.data.world_total.active_cases);
                setNewCases(response.data.world_total.new_cases);
                setNewDeath(response.data.world_total.new_deaths);
                setTotalCases(response.data.world_total.total_cases);
                setTotalDeath(response.data.world_total.total_deaths);
                setTotalRecoveredCases(response.data.world_total.total_recovered);
            } else {
                errorNotification(response.message);
            }
        }
        fetchData();
    }, []);

    const errorNotification = (message) => {
        setNotif({ open: true, color: "danger", message: message });
        setTimeout(function () {
            setNotif({ open: false, message: "" });
        }, 5000);
    }

    const formatNewCasesData = (data) => {
        var geoData = [["Country", "Cases"]];
        for (let i = 0; i < data?.countries_stat.length; i++) {
            geoData.push([data.countries_stat[i].country_name, parseInt(data.countries_stat[i].new_cases.replace(/,/g, ''))]);
        }
        return geoData;
    }


    const formatCasesData = (data) => {
        var geoData = [["Country", "Cases"]];
        for (let i = 0; i < data?.countries_stat.length; i++) {
            geoData.push([data.countries_stat[i].country_name, parseInt(data.countries_stat[i].cases.replace(/,/g, ''))]);
        }
        return geoData;
    }

    const formatDeathsData = (data) => {
        var geoData = [["Country", "Deaths"]];
        for (let i = 0; i < data?.countries_stat.length; i++) {
            geoData.push([data.countries_stat[i].country_name, parseInt(data.countries_stat[i].deaths.replace(/,/g, ''))]);
        }
        return geoData;
    }


    const showGeoGraph = (geoData) => {
        return (
            <Chart
                chartType="GeoChart"
                loader={<div>Loading Chart...</div>}
                data={geoData}
                options={{
                    colorAxis: { colors: ["#FEF95D", "#F76300", "#B00000"] },
                    backgroundColor: '#A5DEEF',
                    datalessRegionColor: '#ffffff',
                    defaultColor: '#f5f5f5',
                }}
                mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                legendToggle
            />
        );
    }

    return (
        <>
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
                <GridItem xs={12} sm={2}></GridItem>

                {/* Geographs for cases and deaths worldwide upto date */}
                <GridItem xs={12} sm={8}>
                    <GridContainer>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="info">
                                    <h4>Active Cases</h4>
                                </CardHeader>
                                <CardBody>
                                    <p>{activeCases}</p>
                                </CardBody>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="rose">
                                    <h4>New Cases</h4>
                                </CardHeader>
                                <CardBody>
                                    <p>{newCases}</p>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>New Deaths</h4>
                                </CardHeader>
                                <CardBody>
                                    <p>{newDeaths}</p>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="info">
                                    <h4>Total Recovered</h4>
                                </CardHeader>
                                <CardBody>
                                    <p>{totalRecoveredCases}</p>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="rose">
                                    <h4>Total Cases</h4>
                                </CardHeader>
                                <CardBody>
                                    <p>{totalCases}</p>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <Divider visible={false}/>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>Total Deaths</h4>
                                </CardHeader>
                                <CardBody>
                                    <p>{totalDeaths}</p>
                                </CardBody>
                            </Card>
                        </GridItem>
                        
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={12}>
                            <Typography variant="h5" gutterBottom>
                                Overall Corona Cases
                            </Typography>
                            {showGeoGraph(formatCasesData(countrywiseData))}
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={12}>
                            <Typography variant="h5" gutterBottom>
                                New Corona Cases
                            </Typography>
                            {showGeoGraph(formatNewCasesData(countrywiseData))}
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={12}>
                            <Typography variant="h5" gutterBottom>
                                Overall Corona Cases
                            </Typography>
                            {showGeoGraph(formatCasesData(countrywiseData))}
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={12}>
                            <Typography variant="h5" gutterBottom>
                                Corona Deaths
                            </Typography>
                            {showGeoGraph(formatDeathsData(countrywiseData))}
                        </GridItem>
                    </GridContainer>

                </GridItem>

                <GridItem xs={12} sm={2}></GridItem>
            </GridContainer>
        </>
    );
}