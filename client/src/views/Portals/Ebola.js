import React from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { ebola } from '../../outputs/ebola';
import GeoMap from './GeoMap';

export default function EbolaPortal() {
    return (
        <GridContainer>
            <GridItem xs={12} sm={2}></GridItem>
            <GridItem xs={12} sm={8}>
                <GeoMap disease={['Ebola', ebola]} />
            </GridItem>
        </GridContainer>
    );
}