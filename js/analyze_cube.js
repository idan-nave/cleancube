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



let prompt = `this is a json: ${JSON.stringify(transformedState)}. it describes a state of a Rubik cube. you must generate a short and concise answer to this prompt, in this array format: [X,X,X,X,X,X,X], where each 'X' is an algorithm fitting each of these 7 stages: 1.Solve The White Face Of The Rubik's Cube, 2.Solve the white corners, 3.Solve The Second Layer (F2L), 4.The Yellow Cross, 5.Swap Last Layer Edges, 6.Position Last Layer Corners, 7.Orient last layer corners. example for 'X': F' L D2 L' F2 R' F. Do not give any other greeting or explanation suffix to this prompt.`;

let result = await getRubikSolutions(prompt);
console.log("result:", result.choices[0].message.content);
// console.log("After Write: " + JSON.stringify(cubeState));

// cubeState = await readCubeState();
// console.log("After Write: " + cubeState);




