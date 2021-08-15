import React from 'react';
import { malaria } from '../../outputs/malaria';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';

import GeoMap from './GeoMap';

export default function MalariaPortal() {
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
                                <p>{666438730}</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <Card>
                            <CardHeader color="rose">
                                <h4>Total Deaths</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{2159768}</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

                <GeoMap disease={['Malaria', malaria]} />

                <Card>
                    <CardBody>
                        <p>Malaria is caused by Plasmodium parasites. The parasites are spread to people through the bites of infected female Anopheles mosquitoes, called 'malaria vectors.' In 2019, nearly half of the world's population was at risk of malaria. Most malaria cases and deaths occur in sub-Saharan Africa. However, the WHO regions of South-East Asia, Eastern Mediterranean, Western Pacific, and the Americas are also at risk.</p>
                    </CardBody>
                </Card>

            </GridItem>
        </GridContainer >

    );
}