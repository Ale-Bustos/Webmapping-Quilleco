import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const UsosLayer: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('https://quilleco-webmap.s3.sa-east-1.amazonaws.com/capas/Usos.json')
            .then(response => response.json())
            .then(setData)
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const getColor = (usoTierra: string): string => {
        const colores: { [key: string]: string } = {
            'Ciudades, Pueblos, Zonas Industriales': '#FF0000',
            'Terreno de Uso Agrícola': '#00FF00',
            'Plantación Adulta': '#0000FF',
            'Plantación Joven o Recién Cosechada': '#FFFF00',
            'Matorral-Pradera Abierto': '#00FFFF',
            'Matorral Abierto': '#FF00FF',
            'Matorral Arborescente Abierto': '#FF1493',
            'Matorral Denso': '#FF4500',
            'Plantación con Exóticas Asilvestradas': '#008000',
            'Bosque Nativo Renoval Semidenso': '#228B22',
            'Bosque Nativo con Exóticas Asilvestradas Semidenso': '#00BFFF',
            'Bosque Nativo con Exóticas Asilvestradas Abierto': '#1E90FF',
            'Playas y Dunas': '#FFFFE0',
            'Cajas de Ríos': '#0000FF',
            'Minería Industrial': '#A9A9A9',
            'Rotación Cultivo-Pradera': '#8A2BE2',
            'Praderas Perennes': '#32CD32',
            'Matorral-Pradera Denso': '#FFD700',
            'Matorral-Pradera Semidenso': '#FF69B4',
            'Matorral Semidenso': '#FF8C00',
            'Matorral Arborescente Semidenso': '#00CED1',
            'Bosque Nativo Adulto Semidenso': '#006400',
            'Bosque Nativo Renoval Denso': '#2E8B57',
            'Ríos': '#1E90FF',
            'Bosque Nativo Adulto-Renoval Semidenso': '#3CB371',
            'Bosque Nativo Adulto-Renoval Denso': '#008080',
            'Bosque Nativo con Exóticas Asilvestradas Denso': '#008B8B',
            'Vegas': '#9ACD32',
            'Otros Terrenos Húmedos': '#4169E1',
            'Otros sin Vegetación': '#696969',
            'Lagos, Lagunas, Embalses, Tranques': '#00FFFF',
            'Estepa Andina Central': '#F0E68C',
            'Afloramientos Rocosos': '#808080',
            'Terreno sobre el Límite Altitudinal de la Vegetación': '#C0C0C0',
            'Corridas de Lavas y Escoriales': '#BDB76B',
            'Nieves': '#FFFFFF',
            'Bosque Nativo Achaparrado Denso': '#006400',
            'Bosque Nativo Achaparrado Semidenso': '#228B22',
            'Bosque Nativo Adulto Abierto': '#00FF00',
            'Bosque Nativo-Plantación Abierto': '#FFFF00',
            'Derrumbe sin Vegetación': '#FF00FF',
            'Bosque Nativo Adulto-Renoval Abierto': '#FF1493',
            'Bosque Nativo Renoval Abierto': '#FF4500'
        };
        return colores[usoTierra] || '#808080';
    };

    const generarPopup = (feature: any, layer: L.Layer) => {
        if (feature.properties) {
            var popupContent = '<b>Descripción:</b><br>';
            if (feature.properties.USO_TIERRA) {
                popupContent += '<b>Uso de la tierra:</b> ' + feature.properties.USO_TIERRA + '<br>';
            }
            if (feature.properties.ESPECI1_CI) {
                popupContent += '<b>Nombre Científico:</b> ' + feature.properties.ESPECI1_CI + '<br>';
            }
            if (feature.properties.ESPECI1_CO) {
                popupContent += '<b>Nombre Común:</b> ' + feature.properties.ESPECI1_CO + '<br>';
            }
            if (feature.properties.SUPERF_HA) {
                popupContent += '<b>Superficie Hectáreas:</b> ' + feature.properties.SUPERF_HA + '<br>';
            }
            layer.bindPopup(popupContent);
        }
    };

    return data ? (
        <GeoJSON
            data={data}
            style={(feature) => {
                const properties = feature?.properties;
                return {
                    color: properties ? getColor(properties.USO_TIERRA) : '#808080',
                    weight: 0.4,
                    opacity: 0.6,
                    fillColor: properties ? getColor(properties.USO_TIERRA) : '#808080',
                    fillOpacity: 0.3
                };
            }}
            onEachFeature={generarPopup}
        />
    ) : null;
};

export default UsosLayer;
