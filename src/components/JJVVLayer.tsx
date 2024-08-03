import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const JJVVLayer: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('https://quilleco-webmap.s3.sa-east-1.amazonaws.com/capas/Juntas_Vecinos.json')
            .then(response => response.json())
            .then(setData)
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const puntoPopup = (feature: any, layer: L.Layer) => {
        if (feature.properties) {
            var popupContent = '<b> Datos de la Organización </b><br>';
            if (feature.properties.Name) {
                popupContent += '<b>Nombre:</b> ' + feature.properties.Name + '<br>';
            }
            if (feature.properties.Sede_o_lugar_de_funcionamiento) {
                popupContent += '<b>Dirección:</b> ' + feature.properties.Sede_o_lugar_de_funcionamiento + '<br>';
            }
            if (feature.properties.Numero_inscriocion_registro_civil) {
                popupContent += '<b>Número inscripción registro civil:</b> ' + feature.properties.Numero_inscriocion_registro_civil + '<br>';
            }
            if (feature.properties.Nombre_presidente) {
                popupContent += '<b>Nombre presidente:</b> ' + feature.properties.Nombre_presidente + '<br>';
            }
            if (feature.properties.Fecha_concesion_personalidad_juridica) {
                popupContent += '<b>Fecha concesión personalidad jurídica:</b> ' + feature.properties.Fecha_concesion_personalidad_juridica + '<br>';
            }
            if (feature.properties.Rol_municipal) {
                popupContent += '<b>Rol municipal:</b> ' + feature.properties.Rol_municipal + '<br>';
            }
            if (feature.properties.Vigencia_de_la_directiva) {
                popupContent += '<b>Vigencia de la directiva:</b> ' + feature.properties.Vigencia_de_la_directiva + '<br>';
            }
            layer.bindPopup(popupContent);

            // Añadir la etiqueta
            if (feature.properties.Name) {
                layer.bindTooltip(feature.properties.Name, {
                    permanent: true,
                    direction: 'top',
                    className: 'jjvv-tooltip'
                }).openTooltip();
            }
        }
    };

    return data ? (
        <GeoJSON
            data={data}
            pointToLayer={(feature, latlng) => {
                const jjvvIcon = L.icon({
                    iconUrl: 'icons/Icon_jjvv.png',
                    iconSize: [40, 40],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30]
                });
                return L.marker(latlng, { icon: jjvvIcon });
            }}
            onEachFeature={puntoPopup}
        />
    ) : null;
};

export default JJVVLayer;
