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
                    <i><Typography variant="h5" gutterBottom>
                        {disease[0] + " Cases vs. Deaths"}
                    </Typography></i>
                    <Chart
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Country", "Cases", "Deaths"],
                            ...all_together_data
                        ]}
                        legendToggle
                    />
                </GridItem>
            </GridContainer>
            <br />
            <br />
            <GridContainer>
                {/* Geo Graph for Cases */}
                <GridItem xs={12} sm={12}>
                    <i><Typography variant="h5" gutterBottom>
                        {disease[0] + " Cases Geo Graph"}
                    </Typography></i>
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
                        legendToggle
                    />
                </GridItem>
            </GridContainer>
        </>
    )
}

export default GeoMap
