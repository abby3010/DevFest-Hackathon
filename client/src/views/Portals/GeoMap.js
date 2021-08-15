import React from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Chart from "react-google-charts";
import { Typography } from "@material-ui/core";

const GeoMap = ({ disease }) => {

    var cases_data = [];
    var deaths_data = [];
    var deaths_gchart_data = [];
    var cases_gchart_data = [];
    var countries = [];

    var all_together_data = [];

    for (let i = 0; i < disease[1].length; i++) {
        cases_data.push(disease[1][i]["Cases"]);
        deaths_data.push(disease[1][i]["Deaths"]);
        countries.push(disease[1][i]["Country"]);
    }

    for (let i = 0; i < disease[1].length; i++) {
        deaths_gchart_data.push([disease[1][i]["Country"], disease[1][i]["Deaths"]]);
        cases_gchart_data.push([disease[1][i]["Country"], disease[1][i]["Cases"]]);
        all_together_data.push([disease[1][i]["Country"], disease[1][i]["Cases"], disease[1][i]["Deaths"]]);
    }

    return (
        <>
            <GridContainer>
                {/* Line Graph for Deaths and Cases */}
                <GridItem xs={12} sm={12}>
                    <Typography variant="h5" gutterBottom>
                        {disease[0] + " Cases vs. Deaths"}
                    </Typography>
                    <Chart
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Country", "Cases", "Deaths"],
                            ...all_together_data
                        ]}
                        options={{
                            vAxis: { logScale:true}
                        }}
                        mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        legendToggle
                    />
                </GridItem>
            </GridContainer>
            <br />
            <br />
            <GridContainer>
                <GridItem xs={12} sm={6}>
                    <Chart
                        height={"400px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart...</div>}
                        data={[
                            ["Country", "Cases"],
                            ...cases_gchart_data
                        ]}
                        options={{
                            title: "Percentage of Cases",
                            
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
                        data={[
                            ["Country", "Deaths"],
                            ...deaths_gchart_data
                        ]}
                        options={{
                            title: "Percentage of Deaths"
                        }}
                        mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        legendToggle
                    />
                </GridItem>

                {/* Geo Graph for Cases */}
                <GridItem xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom>
                        {disease[0] + " Cases Geo Graph"}
                    </Typography>
                    <Chart
                        chartType="GeoChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Country", "Cases"],
                            ...cases_gchart_data
                        ]}
                        options={{
                            colorAxis: { colors: ["#FEF95D", "#F76300", "#B00000"] },
                            backgroundColor: '#A5DEEF',
                            datalessRegionColor: '#ffffff',
                            defaultColor: '#f5f5f5',
                            
                        }}
                        mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        legendToggle
                    />
                </GridItem>
                {/* Geo Graph for Deaths */}
                <GridItem xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom>
                        {disease[0] + " Deaths Geo Graph"}
                    </Typography>
                    <Chart
                        chartType="GeoChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Country", "Deaths"],
                            ...deaths_gchart_data
                        ]}
                        options={{
                            colorAxis: { colors: ["#FEF95D", "#F76300", "#B00000"] },
                            backgroundColor: '#A5DEEF',
                            datalessRegionColor: '#ffffff',
                            defaultColor: '#f5f5f5',
                        }}
                        mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        legendToggle
                    />
                </GridItem>
            </GridContainer>
        </>
    )
}

export default GeoMap
