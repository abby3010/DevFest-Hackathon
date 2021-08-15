import React from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';

import { hivaids } from '../../outputs/hivaids';
import GeoMap from './GeoMap';

export default function HIVPortal() {
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
                                <p>{102742880}</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <Card>
                            <CardHeader color="rose">
                                <h4>Total Deaths</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{2748730}</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>


                <GeoMap disease={['HIV/AIDS', hivaids]} />

                <Card>
                    <CardBody>
                        <p>HIV (human immunodeficiency virus) is a virus that attacks the body’s immune system. If HIV is not treated, it can lead to AIDS (acquired immunodeficiency syndrome). Learning the basics about HIV can keep you healthy and prevent HIV transmission. You can also download materials to share or watch videos on basic information about HIV. There is currently no effective cure. Once people get HIV, they have it for life. But with proper medical care, HIV can be controlled. People with HIV who get effective HIV treatment can live long, healthy lives and protect their partners.</p>
                    </CardBody>
                </Card>

            </GridItem>
        </GridContainer>
    );
}