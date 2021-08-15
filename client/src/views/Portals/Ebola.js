import React from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';

import { ebola } from '../../outputs/ebola';
import GeoMap from './GeoMap';

export default function EbolaPortal() {
    return (
        <GridContainer>
            <GridItem xs={12} sm={1}></GridItem>
            <GridItem xs={12} sm={10}>

                <GridContainer>
                    <GridItem xs={12} sm={4}>
                        <Card>
                            <CardHeader color="info">
                                <h4>Total Cases</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{6325462}</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <Card>
                            <CardHeader color="rose">
                                <h4>Total Deaths</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{2555444}</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

                <GeoMap disease={['Ebola', ebola]} />

                <Card>
                    <CardBody>
                        <p>Ebola Virus Disease (EVD) is a rare and deadly disease in people and nonhuman primates. The viruses that cause EVD are located mainly in sub-Saharan Africa. People can get EVD through direct contact with an infected animal (bat or nonhuman primate) or a sick or dead person infected with Ebola virus. The virus first spreads to people through direct contact with the blood, body fluids and tissues of animals. Ebola virus then spreads to other people through direct contact with body fluids of a person who is sick with or has died from EVD.</p>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}