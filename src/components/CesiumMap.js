import React, { useRef } from 'react';
import { Viewer, Entity, PointGraphics, Color } from 'resium';
import * as Cesium from 'cesium';

const CesiumMap = () => {
  const viewerRef = useRef();

  const addEntityAtCenter = () => {
    const viewer = viewerRef.current.cesiumElement;
    //const center = viewer.camera.pickEllipsoid(viewer.canvas.center);
    // Get the current camera position
    const cameraPosition = viewer.camera.positionCartographic;

    // Extract latitude and longitude
    const centerLatitude = Cesium.Math.toDegrees(cameraPosition.latitude);
    const centerLongitude = Cesium.Math.toDegrees(cameraPosition.longitude);
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
      },
    });
  };

  return (
    <div>
        <button onClick={addEntityAtCenter}>Add Entity at Center</button>
          <div >
              <Viewer ref={viewerRef} >
                  {/* Other map configurations and components go here */}
                  <Entity />
              </Viewer>
          </div>
    </div>
  );
};

export default CesiumMap;