import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as Cesium from "cesium";
import { Viewer, Entity,PointGraphics } from "resium";
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";
function App() {
  const position = Cesium.Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
  const pointGraphics = { pixelSize: 10 };
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (movement) => {
    const { x, y } = movement.endPosition;
    const cartesian = Viewer.camera.pickEllipsoid(new Cesium.Cartesian3(x, y));

    if (cartesian) {
      setMarkers((prevMarkers) => [...prevMarkers, { position: cartesian }]);
    }
  };
  return (
    <div className="App">
      <Viewer full >
        <Entity position={position} point={pointGraphics} ><PointGraphics pixelSize={20} /></Entity>
        <Entity name="map-click-handler" onClick={handleMapClick} point={{ pixelSize: 10, color: 'red' }} />
        {markers.map((marker, index) => (
        <Entity key={index} position={marker.position} point={{ pixelSize: 20, color: 'blue' }} />
      ))}
        </Viewer>
    </div>
  );
}

export default App;
