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



let prompt = `this is a json: ${JSON.stringify(transformedState)}. it describes a state of a Rubik cube. you must generate a short and concise answer to this prompt, in this array format: [X,X,X,:,Y:Y:Y], where each X is an algorithm for the according solution stage, for example: F' L D2 L' F2 R' F. each y is a short description for the according stage. there may be more than 3 steps. do not give any other greeting or explanation suffix to this prompt.`;

let result = await getRubikSolutions(prompt);
console.log("result:", result.choices[0].message.content);
// console.log("After Write: " + JSON.stringify(cubeState));

// cubeState = await readCubeState();
// console.log("After Write: " + cubeState);




