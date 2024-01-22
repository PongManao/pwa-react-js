import React, { useRef, useEffect, useState } from 'react';
import { Viewer, Entity, PointGraphics, Color,PolylineCollection,Camera,CameraFlyTo } from 'resium';
import * as Cesium from 'cesium';

const CesiumMap = () => {
    const viewerRef = useRef();
    const center = Cesium.Cartesian3.fromDegrees(98.9817, 18.7950, 2945000);
    const cesiumOptions = {
        animation: false,
        baseLayerPicker: false,
        geocoder: false,
        timeline: false,
        //baseLayer:undefined,
        baseLayer: Cesium.ImageryLayer.fromProviderAsync(
            Cesium.TileMapServiceImageryProvider.fromUrl(
            Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
            )
        ),
    };
    const [option,setOption] = useState(cesiumOptions);
    
    const SwichMode = () => {
        const viewer = viewerRef.current.cesiumElement;
        console.log('bfr',option.baseLayer)
        if(option.baseLayer)
        {
            setOption(prev => {return {...prev, baseLayer: undefined};});
        }
        else
        {
            setOption(prev => {return {...prev, baseLayer:Cesium.ImageryLayer.fromProviderAsync(
                Cesium.TileMapServiceImageryProvider.fromUrl(
                Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
                )
            )};});
        }
        //viewer.CameraFlyTo.destination = center;
    }

  const addEntityAtCenter = () => {
    const viewer = viewerRef.current.cesiumElement;
    // Get the current camera position
    const cameraPosition = viewer.camera.positionCartographic;

    // Extract latitude and longitude
    const centerLatitude = Cesium.Math.toDegrees(cameraPosition.latitude);
    const centerLongitude = Cesium.Math.toDegrees(cameraPosition.longitude);
    //console.log(viewer.entities.values.length);
    //console.log(viewer.entities, centerLatitude, centerLongitude);
    var pos = Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude, 200);
    if(viewer.entities.values.length > 0){
        console.log('===',viewer.entities.values[0].position._value,pos)
    }
    const checkExistPosition = viewer.entities.values.find((element) => element.position._value.x === pos.x && element.position._value.y === pos.y, );
    let incDegrees = (checkExistPosition)? 10 : 0 ;
    
    viewer.entities.add({
        name:"Air plane"+ viewer.entities.values.length + 1,
        position: Cesium.Cartesian3.fromDegrees(centerLongitude + incDegrees * (viewer.entities.values.length + 1), centerLatitude, 200),
        //   point: {
        //     pixelSize: 10,
        //     color: Cesium.Color.RED,
        //   },
        model: {
            uri: 'images/Cesium_Air.glb', // Provide the path to your airplane GLTF model
            scale: 2.0, // Adjust scale as needed,
            minimumPixelSize : 64
        }
    });
    
  };

  return (
    <div>
        <button onClick={addEntityAtCenter}>Add an airplane</button>
        <button onClick={SwichMode}>Switch mode of Map</button>
          <div >
            <Viewer ref={viewerRef}  {...option}>
                             <CameraFlyTo duration={3} destination={center}/>
                            </Viewer>
          </div>
    </div>
  );
};

export default CesiumMap;