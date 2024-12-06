// // Use `import` for external modules
// import fs from 'fs';
// import path from 'path';

// // To get the equivalent of __dirname in an ES module
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Read the cube state from a local JSON file
// export async function readCubeState() {
//     return new Promise((resolve, reject) => {
//         const filePath = path.join(__dirname, '../json/cube_state_cache.json'); // Adjust path as necessary
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 reject(`Error reading file: ${err}`);
//             } else {
//                 resolve(JSON.parse(data)); // Parse the JSON data
//             }
//         });
//     });
// }

// // Clear the cube state by writing the content of cube_state_empty.json to cube_state_cache.json
// export async function clearCubeState() {
//     return new Promise((resolve, reject) => {
//         const emptyStateFilePath = path.join(__dirname, '../json/cube_state_empty.json'); // Path to the empty state file
//         const cacheFilePath = path.join(__dirname, '../json/cube_state_cache.json'); // Path to the cache file

//         // Read the empty state data
//         fs.readFile(emptyStateFilePath, 'utf8', (err, data) => {
//             if (err) {
//                 reject(`Error reading empty state file: ${err}`);
//             } else {
//                 // Write the empty state data to the cache file
//                 fs.writeFile(cacheFilePath, data, 'utf8', (err) => {
//                     if (err) {
//                         reject(`Error writing to cache file: ${err}`);
//                     } else {
//                         resolve('Cube state cleared and written to cache');
//                     }
//                 });
//             }
//         });
//     });
// }

// // Write only the cubeState (faces) data to a local JSON file
// export async function writeCubeState(cubeState) {
//     return new Promise((resolve, reject) => {
//         const filePath = path.join(__dirname, '../json/cube_state_cache.json'); // Path to the existing file

//         // First, read the current data from the file
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 reject(`Error reading file: ${err}`);
//             } else {
//                 try {
//                     // Parse the existing data
//                     const jsonData = JSON.parse(data);

//                     // Replace only the "solutions" part of the existing data
//                     jsonData.cubeState = cubeState;

//                     // Write the updated data back to the file
//                     fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
//                         if (err) {
//                             reject(`Error writing to file: ${err}`);
//                         } else {
//                             resolve('File written successfully');
//                         }
//                     });
//                 } catch (error) {
//                     reject(`Error parsing JSON data: ${error}`);
//                 }
//             }
//         });
//     });
// }

// // Write only the cubeSolutions data to a local JSON file
// export async function writeCubeSolutions(algos_arr) {
//     // Define the file path for the JSON file
//     const filePath = path.join(__dirname, '../json/cube_state_cache.json');

//     // Load the existing JSON file
//     let jsonData;
//     try {
//         const rawData = fs.readFileSync(filePath, 'utf-8');
//         jsonData = JSON.parse(rawData);
//     } catch (error) {
//         console.error(`Error reading JSON file at ${filePath}:`, error);
//         return;
//     }

//     // Validate that the JSON structure exists
//     if (!jsonData.solutions || !jsonData.solutions.easy || !jsonData.solutions.easy.stages) {
//         console.error('The JSON structure is missing required keys.');
//         return;
//     }

//     // Ensure the stages array has the right number of stages
//     const stages = jsonData.solutions.easy.stages;
//     while (stages.length < algos_arr.length) {
//         stages.push({ id: "", header: "", algorithm: "", notes: "" });
//     }

//     // Update the algorithm values in each stage
//     algos_arr.forEach((algo, index) => {
//         if (stages[index]) {
//             stages[index].algorithm = algo;
//         }
//     });

//     // Write the updated JSON back to the file
//     try {
//         fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
//         console.log('Cube solutions written successfully to the JSON file.');
//     } catch (error) {
//         console.error(`Error writing to JSON file at ${filePath}:`, error);
//     }
// }