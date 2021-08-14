import React from 'react';
import { cholera } from '../../outputs/cholera';
import GeoMap from './GeoMap';

export default function CholeraPortal() {
    return (
        <GeoMap disease={['Cholera', cholera]} />
    );
}