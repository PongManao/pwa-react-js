import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import * as Cesium from "cesium";
import { Viewer, Entity,PointGraphics, ScreenSpaceEventHandler, Cartesian3,EntityDescription } from "resium";
import CesiumMap from './components/CesiumMap'
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";
function App() {
  const position = Cesium.Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
  const pointGraphics = { pixelSize: 10 };
  const [markers, setMarkers] = useState([]);
  const ref = useRef(null);
  let viewer;
  // const handleMapClick = (movement) => {
  //   const { x, y } = movement.position;
  //   const viewer = movement.viewer;

  //   if (viewer) {
  //     const cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(x, y));

  //     if (cartesian) {
  //       setMarkers((prevMarkers) => [...prevMarkers, { position: cartesian }]);
  //     }
  //   }
  // };

  // console.log(ref);
  // if(ref.current){
  //   viewer = ref.current.cesiumElement;
  //   console.log(ref.current);
  // }
  // useEffect(() => {
  //   console.log(viewer);
  //   if(!viewer) return;
  //   // Initialize ScreenSpaceEventHandler
  //   const screenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.scene.canvas);

  //   // Handle left-click event
  //   screenSpaceEventHandler.setInputAction((movement) => {
  //     // Get the clicked position in Cartesian coordinates
  //     const pickedLocation = viewer.scene.pickPosition(movement.endPosition);

  //     // Check if a valid location is picked
  //     if (pickedLocation) {
  //       // Your logic to add an object or perform an action at the clicked position
  //       console.log('Clicked at:', pickedLocation);
  //     }
  //   }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  //   // Clean up the event handler when the component unmounts
  //   return () => {
  //     screenSpaceEventHandler.destroy();
  //   };
  // }, []);
  const [entities, setEntities] = useState([]);

  // Create a handler for the map click event
  function handleMapClick(event) {
      // Get the clicked position
      const position = event.position;

      //Create a new entity object with the position and a random color
      // const entity = new Entity({
      //     position: position,
      //     point: {
      //     pixelSize: 10,
      //     color: new Cesium.ColorMaterialProperty(getRandomColor()),
      //     },
      // });
      const entity = {
        position: position,
        point: {
        pixelSize: 10,
        color: new Cesium.ColorMaterialProperty(getRandomColor()),
        }};
      console.log('entity:::', entity);
      //Add the entity to the state
      setEntities([...entities, entity]);
  }
  function getRandomColor() {
    return Cesium.Color.fromRandom({ alpha: 1.0 });
  }
  return (
    <div className="App">
      {/* <Viewer full ref={ref}>
        <Entity position={position} point={pointGraphics}>
          <PointGraphics pixelSize={20} />
        </Entity>
        <Entity
          name="map-click-handler"
          onClick={handleMapClick}
          point={{ pixelSize: 10, color: 'red' }}
        />
        {markers.map((marker, index) => (
          <Entity key={index} position={marker.position} point={{ pixelSize: 20, color: 'blue' }} />
        ))}
      </Viewer> */}
      <CesiumMap></CesiumMap>


      {/* <Viewer full onClick={handleMapClick}>
      <Entity position={position} point={pointGraphics}>
          <PointGraphics pixelSize={20} />
        </Entity>
        {entities.map((entity, index) => (
            // <Entity key={index} {...entity}>
            //     <EntityDescription>
            //     <p>You clicked on: {entity.position.x}, {entity.position.y}</p>
            //     </EntityDescription>
            // </Entity>
            <Entity key={index} position={entity.position} point={entity.point} />
        ))}
        {JSON.stringify(entities.map(x=> x.position))}
        </Viewer> */}
    </div>
  );
}

export default App;
