//ai_solve_cube.js

import { readCubeState, writeCubeState, clearCubeState } from './read_write_json.js';
import { getRubikSolutions } from './ai_solve_cube.js';
import { sendImagesToServer } from './photo.js';

// const cubeState = await sendImagesToServer();

let cubeState = {
    'Image 1': [
        ['yellow', 'blue', 'orange'],
        ['yellow', 'red', 'orange'],
        ['red', 'blue', 'green']
    ],
    'Image 2': [
        ['white', 'orange', 'red'],
        ['white', 'yellow', 'red'],
        ['yellow', 'orange', 'red']
    ],
    'Image 3': [
        ['white', 'red', 'yellow'],
        ['white', 'orange', 'yellow'],
        ['white', 'green', 'orange']
    ]
}


// console.log("Result is:", cubeState);

// Transform the data
const transformedState = {
    description: "A scrambled Rubik's Cube state.",
    faces: {
        front: cubeState['Image 1'],
        top: cubeState['Image 2'],
        right: cubeState['Image 3']
    }
};

await writeCubeState(transformedState);
// cubeState = await readCubeState();
// console.log("After Write: " + JSON.stringify(cubeState));

// clearCubeState();
cubeState = await readCubeState();
// console.log("After clear: " + cubeState);



let prompt = `this is a json: ${JSON.stringify(cubeState)} . 'cubeState' describes a state a Rubik cube, with 3 faces. overwrite 'solutions' so it will fit the cubeState, use it as a template for data. number of solution stages may vary`;

getRubikSolutions(prompt);
console.log("After Write: " + JSON.stringify(cubeState));

// cubeState = await readCubeState();
// console.log("After Write: " + cubeState);




