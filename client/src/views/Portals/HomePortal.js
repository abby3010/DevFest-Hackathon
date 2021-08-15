import React from 'react'
import vec from '../../assets/img/backgrounds/wallpaper8.png'
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Typography } from "@material-ui/core";
import { info } from './info';
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";

const HomePortal = () => {
    return (
        <div>
            <div className="home-portal">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                        <Typography variant="h3" align="center">
                            Epidemiology
                        </Typography>
                        <br />
                        <Typography variant="subtitle1" gutterBottom>
                            The word epidemiology comes from the Greek words epi, meaning on or upon, demos, meaning people, and logos, meaning the study of. In other words, the word epidemiology has its roots in the study of what befalls a population.
                        </Typography>
                        <br />
                        <i>
                            <Typography variant="subtitle1">
                                Epidemiology is the study of the distribution and determinants of health-related states or events in specified populations, and the application of this study to the control of health problems
                            </Typography>
                        </i>
                        <br />
                        <Typography variant="subtitle1" gutterBottom>
                            Let us take a look at some of the most fatal epidemics that hit the world.
                        </Typography>
                        <br />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <img src={vec} alt="vec" style={{ width: '100%' }}></img>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                </GridContainer>
            </div>
            <div className="home-portal">
                <GridContainer>
                    {
                        info.map(elem => {
                            return (
                                <GridItem xs={12} sm={6} md={4} key={elem.link}>
                                    <Card>
                                        <div style={{ background: '#9C27B0', color: '#FFFFFF', padding: '0.5rem 0', textAlign: 'center' }}>
                                            <h5>{elem.name}</h5>
                                        </div>
                                        <CardBody>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {elem.para1}
                                            </Typography>
                                            <br />
                                            <a href={elem.link}>Know More &gt;</a>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            )
                        })
                    }
                </GridContainer>
            </div>
            <div style={{paddingBottom: '2rem', textAlign: 'center'}}>
                <i>“In this midst of this catastrophe, more than looking in to find serenity we need to look out for one another to practice humanity.”</i>
            </div>
        </div>
    )
}

export default HomePortal
