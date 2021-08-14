import React from 'react';
import { malaria } from '../../outputs/malaria';
import GeoMap from './GeoMap';

export default function MalariaPortal() {
    return (
        <GeoMap disease={['Malaria', malaria]} />
    );
}