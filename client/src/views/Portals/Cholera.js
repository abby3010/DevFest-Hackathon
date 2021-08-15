import React from 'react';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { cholera } from '../../outputs/cholera';
import GeoMap from './GeoMap';

export default function CholeraPortal() {
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
                                <p>{9180678}</p>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <Card>
                            <CardHeader color="rose">
                                <h4>Total Deaths</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{897204}</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

                <GeoMap disease={['Cholera', cholera]} />

                <Card>
                    <CardBody>
                        <p> 
                            Cholera can be endemic or epidemic. A cholera-endemic area is an area where confirmed cholera cases
                            were detected during the last 3 years with evidence of local transmission. Cholera is an acute diarrhoeal
                            infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.
                            Cholera remains a global threat to public health and an indicator of inequity and lack of social development.</p>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}