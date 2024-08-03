import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

const RedVialLayer: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('https://quilleco-webmap.s3.sa-east-1.amazonaws.com/capas/RedVial.json')
            .then(response => response.json())
            .then(setData)
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    return data ? <GeoJSON data={data} style={{ color: "#737373", weight: 2, opacity: 1, fillColor: "#737373", fillOpacity: 0 }} /> : null;
};

export default RedVialLayer;
