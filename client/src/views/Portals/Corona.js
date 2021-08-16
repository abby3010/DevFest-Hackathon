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
import Muted from "../../components/Typography/Muted.js";

import { getCoronaDataCountrywise } from '../../api';
import { CircularProgress, Divider, Typography } from '@material-ui/core';

export default function CoronaPortal() {
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [countrywiseData, setCountrywiseData] = useState();
    const [activeCases, setActiveCases] = useState();
    const [newCases, setNewCases] = useState();
    const [newDeaths, setNewDeath] = useState();
    const [totalCases, setTotalCases] = useState();
    const [totalDeaths, setTotalDeath] = useState();
    const [totalRecoveredCases, setTotalRecoveredCases] = useState();
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            } else {
                errorNotification(response.message);
                setIsLoading(false);
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

    const formatNewDeathsData = (data) => {
        var geoData = [["Country", "Cases"]];
        for (let i = 0; i < data?.countries_stat.length; i++) {
            geoData.push([data.countries_stat[i].country_name, parseInt(data.countries_stat[i].new_deaths.replace(/,/g, ''))]);
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

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var year = a.getUTCFullYear();
        var time = `${date} ${month}, ${year}`
        return time;
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
                <GridItem xs={12} sm={1}></GridItem>

                {/* Geographs for cases and deaths worldwide upto date */}
                <GridItem xs={12} sm={10}>
                    <GridContainer>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="info">
                                    <h4>Active Cases</h4>
                                </CardHeader>
                                <CardBody>
                                    {isLoading ? <CircularProgress /> : <p>{activeCases}</p>}
                                </CardBody>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="rose">
                                    <h4>New Cases</h4>
                                </CardHeader>
                                <CardBody>
                                    {isLoading ? <CircularProgress /> : <p>{newCases}</p>}
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>New Deaths</h4>
                                </CardHeader>
                                <CardBody>
                                    {isLoading ? <CircularProgress /> : <p>{newDeaths}</p>}
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="info">
                                    <h4>Total Recovered</h4>
                                </CardHeader>
                                <CardBody>
                                    {isLoading ? <CircularProgress /> : <p>{totalRecoveredCases}</p>}
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="rose">
                                    <h4>Total Cases</h4>
                                </CardHeader>
                                <CardBody>
                                    {isLoading ? <CircularProgress /> : <p>{totalCases}</p>}
                                </CardBody>
                            </Card>
                        </GridItem>
                        <Divider visible={false} />
                        <GridItem xs={12} sm={4}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>Total Deaths</h4>
                                </CardHeader>
                                <CardBody>
                                    {isLoading ? <CircularProgress /> : <p>{totalDeaths}</p>}
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>

                    {/* Update on - date */}
                    {
                        countrywiseData ?
                            <>
                                <Muted>{"All the statistical data is taken on " + timeConverter(countrywiseData.statistic_taken_at)}</Muted>
                                <br /></> : null
                    }

                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <Chart
                                height={"400px"}
                                chartType="PieChart"
                                loader={<div>Loading Chart...</div>}
                                data={formatNewCasesData(countrywiseData)}
                                options={{
                                    title: "Percentage of new Corona cases"
                                }}
                                mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                                legendToggle
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <Chart
                                height={"400px"}
                                chartType="PieChart"
                                loader={<div>Loading Chart...</div>}
                                data={formatNewDeathsData(countrywiseData)}
                                options={{
                                    title: "Percentage of recent Corona deaths"
                                }}
                                mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                                legendToggle
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <br />
                            <br />
                            <Typography variant="h5" gutterBottom>
                                New Corona Cases
                            </Typography>
                            {showGeoGraph(formatNewCasesData(countrywiseData))}
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <br />
                            <br />
                            <Typography variant="h5" gutterBottom>
                                Overall Corona Cases
                            </Typography>
                            {showGeoGraph(formatCasesData(countrywiseData))}
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={6}>
                            <br />
                            <br />
                            <Typography variant="h5" gutterBottom>
                                New Deaths from Corona
                            </Typography>
                            {showGeoGraph(formatNewDeathsData(countrywiseData))}
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <br />
                            <br />
                            <Typography variant="h5" gutterBottom>
                                Overall Corona Deaths
                            </Typography>
                            {showGeoGraph(formatDeathsData(countrywiseData))}
                        </GridItem>
                    </GridContainer>

                    <Card>
                        <CardBody>
                            <p>
                                Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.
                                <br /><br />
                                Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.
                                <br /><br />
                                The best way to prevent and slow down transmission is to be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.
                                <br /><br />
                                The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={1}></GridItem>
            </GridContainer>
        </>
    );
}