import React from 'react';
import QuillecoLayer from './QuillecoLayer';
import UsosLayer from './UsosLayer';
import RedHidricaLayer from './RedHidricaLayer';
import RedVialLayer from './RedVialLayer';
import JJVVLayer from './JJVVLayer';

const MapLayers: React.FC = () => {
    return (
        <>
            <QuillecoLayer />
            <UsosLayer />
            <RedHidricaLayer />
            <RedVialLayer />
            <JJVVLayer />
        </>
    );
};

export default MapLayers;
