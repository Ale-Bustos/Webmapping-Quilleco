import React from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import QuillecoLayer from './components/QuillecoLayer';
import UsosLayer from './components/UsosLayer';
import RedHidricaLayer from './components/RedHidricaLayer';
import RedVialLayer from './components/RedVialLayer';
import JJVVLayer from './components/JJVVLayer';
import TitleControl from './components/TitleControl';
import './styles.css';

const App: React.FC = () => {
    return (
        <MapContainer center={[-37.428265, -71.814135]} zoom={11} style={{ height: '100vh', width: '100vw' }}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Satellite">
                    <TileLayer
                        url='http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        maxZoom={20}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay checked name="Límite Comunal">
                    <QuillecoLayer />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Uso de Suelo">
                    <UsosLayer />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Red Hídrica">
                    <RedHidricaLayer />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Red Vial">
                    <RedVialLayer />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Junta de Vecinos">
                    <JJVVLayer />
                </LayersControl.Overlay>
            </LayersControl>
            <TitleControl />
        </MapContainer>
    );
};

export default App;
