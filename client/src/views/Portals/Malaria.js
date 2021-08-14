import React from 'react';
import { malaria } from '../../outputs/malaria';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import GeoMap from './GeoMap';

export default function MalariaPortal() {
    return (
        <GridContainer>
            <GridItem xs={12} sm={2}></GridItem>
            <GridItem xs={12} sm={8}>
                <GeoMap disease={['Malaria', malaria]} />
            </GridItem>
        </GridContainer>

    );
}