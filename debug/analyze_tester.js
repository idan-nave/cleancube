//ai_solve_cube.js

import { readCubeState, writeCubeState, clearCubeState, writeCubeSolutions } from './read_write_json.js';
import { getRubikSolutions } from './ai_solve_cube.js';
import { sendImagesToServer } from '../js/photo.js';

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

// await writeCubeState(transformedState);
// cubeState = await readCubeState();
// console.log("After Write: " + JSON.stringify(cubeState));

// clearCubeState();
// cubeState = await readCubeState();
// console.log("After Clear: " + JSON.stringify(cubeState));



let prompt = `this is a json: ${JSON.stringify(transformedState)}. it describes a state of a Rubik cube. you must generate a short and concise answer to this prompt, in this array format: [X,X,X,X,X,X,X], where each 'X' is an algorithm fitting each of these 7 stages:
1. White cross,
2. White corners,
3. Second layer,
4. Yellow cross,
5. Yellow edges,
6. Yellow corners,
7. Orient yellow corners.
example for 'X': F' L D2 L' F2 R' F. Do not give any other greeting or explanation suffix to this prompt.`;

let result = await getRubikSolutions(prompt);
let solutions = JSON.parse(result.choices[0].message.content);

// let solutions = ["F D2 F' L' D' R", "R U R' U' F' U' F", "U R U' R' U' F' U F", "F R U R' U' F'", "R U R' U' R' F R F'", "U R Ui Li U Ri Ui L", "Ui Ri Ui R U Ri Ui R"];

console.log(solutions);
// console.log(typeof solutions);

writeCubeSolutions(solutions);

// console.log("After Write: " + JSON.stringify(cubeState));

// cubeState = await readCubeState();
// console.log("After Write: " + JSON.stringify(cubeState.solutions.easy));






