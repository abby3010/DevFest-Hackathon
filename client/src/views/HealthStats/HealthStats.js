import React, { useState } from 'react'
import { malaria } from '../../info/malaria'
import { tuberculosis } from '../../info/tuberculosis'
import { lifeExpectancy } from '../../info/lifeExpectancyAtBirth';
import { maternalMortality } from '../../info/maternalMortality';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from '../../components/Grid/GridItem';
import Chart from 'react-google-charts';
import { Typography } from '@material-ui/core';

const HealthStats = () => {

    const [countryMalaria, setCountryMalaria] = useState('India')
    const [countryTB, setCountryTB] = useState('India')
    const [countryLifeExp, setCountryLifeExp] = useState('India')
    const [countryMatMor, setCountryMatMor] = useState('India')

    const SelectMenu = ({ countryList, country, setCountry, text }) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>
                    {text}
                </Typography>
                <Select size="small" variant='outlined' value={country} onChange={(e) => setCountry(e.target.value)}>
                    {
                        countryList.map((elem) => {
                            return (
                                <MenuItem key={elem["country"]} value={elem["country"]}>{elem["country"]}</MenuItem>
                            )
                        })
                    }
                </Select>
            </div>
        )
    }

    return (
        <div className='heath-stats-container'>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <div style={{ margin: '10px 0' }}>
                        <SelectMenu text='Incedence of Malaria' countryList={malaria} country={countryMalaria} setCountry={setCountryMalaria} />
                        <Chart
                            height={"300px"}
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Year", "Malaria incidence (per 1000 population at risk)"],
                                ...malaria.filter(x => x["country"] === countryMalaria)[0]["values"]
                            ]}
                            options={{
                                title: `Incedence of Malaria in ${countryMalaria} over the years.`,
                                vAxis: { logScale: false }
                            }}
                            legendToggle
                        />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div style={{ margin: '10px 0' }}>
                        <SelectMenu text='Incedence of Tuberculosis' countryList={tuberculosis} country={countryTB} setCountry={setCountryTB} />
                        <Chart
                            height={"300px"}
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Year", "Incidence of tuberculosis (per 100,000 population per year)"],
                                ...tuberculosis.filter(x => x["country"] === countryTB)[0]["values"]
                            ]}
                            options={{
                                title: `Incedence of Tuberculosis in ${countryTB} over the years.`,
                                vAxis: { logScale: false }
                            }}
                            legendToggle
                        />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div style={{ margin: '3rem 0' }}>
                        <SelectMenu text='Maternal Mortality Rate' countryList={maternalMortality} country={countryMatMor} setCountry={setCountryMatMor} />
                        <Chart
                            height={"300px"}
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Year", "Maternal mortality ratio"],
                                ...maternalMortality.filter(x => x["country"] === countryMatMor)[0]["values"]
                            ]}
                            options={{
                                title: `Maternal mortality ratio (per 100 000 live births) in ${countryMatMor}`,
                                vAxis: { logScale: false }
                            }}
                            legendToggle
                        />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div style={{ margin: '3rem 0' }}>
                        <SelectMenu text='Life Expectancy (years)' countryList={lifeExpectancy} country={countryLifeExp} setCountry={setCountryLifeExp} />
                        <Chart
                            height={"300px"}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Year", "Males", "Females"],
                                ...lifeExpectancy.filter(x => x["country"] === countryLifeExp)[0]["values"]
                            ]}
                            options={{
                                title: `Life expectancy at birth (years) in ${countryLifeExp} over the years.`,
                                vAxis: { logScale: false }
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
