import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { ebola } from '../../outputs/ebola';
import GeoMap from './GeoMap';

export default function EbolaPortal() {
    return (
        <>
            <CssBaseline />
            <GeoMap disease={['Ebola', ebola]} />
        </>
    );
}