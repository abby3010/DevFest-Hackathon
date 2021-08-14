import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

const GeoMap = ({ disease }) => {

    var cases_data = [];
    var deaths_data = [];
    var countries = [];
    useEffect(() => {


        for (let i = 0; i < disease[1].length; i++) {
            cases_data.push(disease[1][i]["Cases"]);
            deaths_data.push(disease[1][i]["Deaths"]);
            countries.push(disease[1][i]["Country"]);
        }
    }, [])

    const cases_dataBar = {
        labels: countries,
        datasets: [
            {
                label: disease[0],
                backgroundColor: '#000',
                borderWidth: 0,
                data: cases_data
            },
        ]
    };

    const deaths_dataBar = {
        labels: countries,
        datasets: [
            {
                label: disease[0],
                backgroundColor: '#000',
                borderWidth: 0,
                data: deaths_data
            },
        ]
    };

    return (
        // <div className="chart-bearer">
        <GridContainer>
            <GridItem xs={12} sm={6}>

                <h3>{disease[0] + " Cases"}</h3>
                <Bar
                    data={cases_dataBar}
                    width={50}
                    height={30}
                />
            </GridItem>
            <GridItem xs={12} sm={6}>
            <h3>{disease[0] + " Deaths"}</h3>
            <Bar
                data={deaths_dataBar}
                width={50}
                height={30}
            />
            </GridItem>
        </GridContainer>
    )
}

export default GeoMap
