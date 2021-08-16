import React, { useState } from 'react'
import { malaria } from '../../info/malaria'
import { tuberculosis } from '../../info/tuberculosis'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from '../../components/Grid/GridItem';
import Chart from 'react-google-charts';

const HealthStats = () => {

    const [countryMalaria, setCountryMalaria] = useState('Afghanistan')
    const [countryTB, setCountryTB] = useState('Afghanistan')

    console.log(malaria.filter(x => x["country"] === countryMalaria)[0]["values"])

    const SelectMenu = ({ countryList, country, setCountry }) => {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
            <label style={{marginRight: '10px'}}>Country</label>
            <Select size="small" variant='outlined' value={country} onChange={(e) => setCountry(e.target.value)}>
                {
                    countryList.map((elem) => {
                        return (
                            <MenuItem value={elem["country"]}>{elem["country"]}</MenuItem>
                        )
                    })
                }
            </Select>
            </div>
        )
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={1}></GridItem>
                <GridItem xs={12} sm={5}>
                    <div style={{ margin: '10px 0' }}>
                        <SelectMenu countryList={malaria} country={countryMalaria} setCountry={setCountryMalaria} />
                        <Chart
                            height={"300px"}
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Year", "Value"],
                                ...malaria.filter(x => x["country"] === countryMalaria)[0]["values"]
                            ]}
                            options={{
                                title: `Incedence of Malaria in ${countryMalaria} over the years.`,
                                vAxis: { logScale: true }
                            }}
                            legendToggle
                        />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <div style={{ margin: '10px 0' }}>
                        <SelectMenu countryList={tuberculosis} country={countryTB} setCountry={setCountryTB} />
                        <Chart
                            height={"300px"}
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Year", "Value"],
                                ...tuberculosis.filter(x => x["country"] === countryTB)[0]["values"]
                            ]}
                            options={{
                                title: `Incedence of Tuberculosis in ${countryTB} over the years.`,
                                vAxis: { logScale: true }
                            }}
                            legendToggle
                        />
                    </div>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default HealthStats
