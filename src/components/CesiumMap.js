import React, { useRef, useEffect } from 'react';
import { Viewer, Entity, PointGraphics, Color,PolylineCollection,Camera } from 'resium';
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
    console.log(viewer.entities, centerLatitude, centerLongitude);
    //const checkExistPosition = viewer.entities.find((element) => element.position.x == centerLatitude && element.position.y == centerLongitude);
    
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude),
    //   point: {
    //     pixelSize: 10,
    //     color: Cesium.Color.RED,
    //   },
      model: {
        uri: 'images/Cesium_Air.glb', // Provide the path to your airplane GLTF model
        scale: 2.0, // Adjust scale as needed,
        minimumPixelSize : 64
    },
    });
  };

  const center = Cesium.Cartesian3.fromDegrees(14.492666542936876, 100.5056808521216);
  const centerPoint = { lat: 13.7563, lon: 100.5018 }; // Coordinates for Thailand (Bangkok)
  return (
    <div>
        <button onClick={addEntityAtCenter}>Add Entity at Center</button>
          <div >
              <Viewer ref={viewerRef} >
              {/* <Camera
                defaultPosition={centerPoint}
                defaultCenter={centerPoint}
                defaultZoom={7}
            />
            <Entity
                position={centerPoint}
                point={{ pixelSize: 10, color: Cesium.Color.RED }}
            /> */}
              </Viewer>
          </div>
    </div>
  );
};

export default CesiumMap;