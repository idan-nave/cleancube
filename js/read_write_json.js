// Use `import` for external modules
import fs from 'fs';
import path from 'path';

// To get the equivalent of __dirname in an ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Read the cube state from a local JSON file
export function readCubeState() {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../json/cube_state_cache.json'); // Adjust path as necessary
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading file: ${err}`);
            } else {
                resolve(JSON.parse(data)); // Parse the JSON data
            }
        });
    });
}

// Clear the cube state by writing the content of cube_state_empty.json to cube_state_cache.json
export function clearCubeState() {
    return new Promise((resolve, reject) => {
        const emptyStateFilePath = path.join(__dirname, '../json/cube_state_empty.json'); // Path to the empty state file
        const cacheFilePath = path.join(__dirname, '../json/cube_state_cache.json'); // Path to the cache file

        // Read the empty state data
        fs.readFile(emptyStateFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading empty state file: ${err}`);
            } else {
                // Write the empty state data to the cache file
                fs.writeFile(cacheFilePath, data, 'utf8', (err) => {
                    if (err) {
                        reject(`Error writing to cache file: ${err}`);
                    } else {
                        resolve('Cube state cleared and written to cache');
                    }
                });
            }
        });
    });
}

// Write only the cubeState (faces) data to a local JSON file
export function writeCubeState(cubeState) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../json/cube_state_cache.json'); // Path to the existing file

        // First, read the current data from the file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading file: ${err}`);
            } else {
                try {
                    // Parse the existing data
                    const jsonData = JSON.parse(data);

                    // Replace only the "solutions" part of the existing data
                    jsonData.cubeState = cubeState;

                    // Write the updated data back to the file
                    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                        if (err) {
                            reject(`Error writing to file: ${err}`);
                        } else {
                            resolve('File written successfully');
                        }
                    });
                } catch (error) {
                    reject(`Error parsing JSON data: ${error}`);
                }
            }
        });
    });
}

// Write only the cubeSolutions data to a local JSON file
export function writeCubeSolutions(cubeSolutions) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../json/cube_state_cache.json'); // Path to the existing file

        // First, read the current data from the file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading file: ${err}`);
            } else {
                try {
                    // Parse the existing data
                    const jsonData = JSON.parse(data);

                    // Replace only the "solutions" part of the existing data
                    jsonData.solutions = cubeSolutions;

                    // Write the updated data back to the file
                    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                        if (err) {
                            reject(`Error writing to file: ${err}`);
                        } else {
                            resolve('File written successfully');
                        }
                    });
                } catch (error) {
                    reject(`Error parsing JSON data: ${error}`);
                }
            }
        });
    });
}