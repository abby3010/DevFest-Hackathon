import React from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { hivaids } from '../../outputs/hivaids';
import GeoMap from './GeoMap';

export default function HIVPortal() {
    return (
        <GridContainer>
            <GridItem xs={12} sm={2}></GridItem>
            <GridItem xs={12} sm={8}>
                <GeoMap disease={['HIV/AIDS', hivaids]} />
            </GridItem>
        </GridContainer>
    );
}