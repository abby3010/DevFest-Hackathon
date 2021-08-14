import React from 'react';
import { h1n1 } from '../../outputs/h1n1';
import GeoMap from './GeoMap';

export default function H1N1Portal() {
    return (
        <GeoMap disease={['H1N1', h1n1]} />
    );
}