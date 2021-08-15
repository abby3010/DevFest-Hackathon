import React from 'react';
import { h1n1 } from '../../outputs/h1n1';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';

import GeoMap from './GeoMap';

export default function H1N1Portal() {
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
                                <p>{973183}</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <Card>
                            <CardHeader color="rose">
                                <h4>Total Deaths</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{5289}</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

                <GeoMap disease={['H1N1', h1n1]} />

                <Card>
                    <CardBody>
                        <p>In the spring of 2009, a novel influenza A (H1N1) virus emerged. It was detected first in the United States and spread quickly across the world. This new H1N1 virus contained a unique combination of influenza genes not previously identified in animals or people. This virus was designated as influenza A (H1N1)pdm09 virus. Ten years later work continues to better understand influenza, prevent disease, and prepare for the next pandemic.</p>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}