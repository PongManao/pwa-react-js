import React, { useState } from "react";
import { Viewer, Entity, EntityDescription,Camera } from "resium";
import { Cartesian3, Color, ColorMaterialProperty } from "cesium";

// A function that generates a random color
function getRandomColor() {
    return Color.fromRandom({ alpha: 1.0 });
}

// A React component that renders a map and clickable to add object on the map
function CesiumMap() {
    // Create a state to store the entities
    const [entities, setEntities] = useState([]);

    // Create a handler for the map click event
    // function handleMapClick(event) {
    //     // Get the clicked position
    //     const position = event.position;

    //     // Create a new entity object with the position and a random color
    //     const entity = {
    //         position: position,
    //         point: {
    //         pixelSize: 10,
    //         color: new ColorMaterialProperty(getRandomColor()),
    //         },
    //     };

    //     // Add the entity to the state
    //     setEntities([...entities, entity]);
    // }
    const handleMapClick2 = (movement) => {
        debugger;
        const { endPosition } = movement;
        console.log('movement:::',movement);
        const entity = {
            position: endPosition,
            point: {
            pixelSize: 10,
            color: new ColorMaterialProperty(getRandomColor()),
            },
        };

        // Add the entity to the state
        setEntities([...entities, entity]);
      };

    // Render the viewer component with the click handler and the entities
    return (
        <Viewer full >
        {entities.map((entity, index) => (
            <Entity key={index} {...entity}>
                <EntityDescription>
                <p>You clicked on: {entity.position.x},{entity.position.y}</p>
                </EntityDescription>
            </Entity>
        ))}
        <Camera onLeftClick={handleMapClick2}/>
        </Viewer>
    );
}

export default CesiumMap;