import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

const TitleControl = () => {
    const map = useMap();

    useEffect(() => {
        const TitleControlClass = L.Control.extend({
            onAdd: function () {
                const div = L.DomUtil.create('div', 'info');
                div.innerHTML = `
                    <div align="center">
                        <img src="icons/Escudo_de_Quilleco.svg.png" alt="Imagen" width="100">
                        <h2 style="text-align: center; margin-top: 0.5; line-height: 0;">Quilleco</h2>
                        <h3 style="text-align: center; line-height: 0;">Agua de Lágrimas</h3>
                        <h4 style="text-align: center; line-height: 0;">Región del Biobío</h4>
                    </div>`;
                return div;
            },
            onRemove: function () {
                // No cleanup necessary for this control
            }
        });

        const titleControl = new TitleControlClass({ position: 'topright' });
        titleControl.addTo(map);

        return () => {
            map.removeControl(titleControl);
        };
    }, [map]);

    return null;
};

export default TitleControl;
