import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const RedHidricaLayer: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('https://quilleco-webmap.s3.sa-east-1.amazonaws.com/capas/Redes_Hidricas.json')
            .then(response => response.json())
            .then(setData)
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const onEachFeature = (feature: any, layer: L.Layer) => {
        if (feature.properties && feature.properties.Nombre) {
            const name = feature.properties.Nombre;
            layer.bindTooltip(name, {
                permanent: true,
                direction: 'center',
                className: 'water-label'
            }).openTooltip();
        }
    };

    return data ? (
        <GeoJSON
            data={data}
            style={() => ({
                color: "#0066ff",
                weight: 2,
                opacity: 1,
                fillColor: "#0066ff",
                fillOpacity: 0
            })}
            onEachFeature={onEachFeature}
        />
    ) : null;
};

export default RedHidricaLayer;
