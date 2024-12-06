
// import { readCubeState } from './read_write_json.js';

//#########################################################
//IF IMPORTED readCubeState ABOVE- ANALYZE BUTTON STOPS WORKING!!!!!!!!
//#########################################################


// Progress bar update
function updateProgressBar(button) {
    button.style.background = `linear-gradient(to right, #4CAF50 ${(clickCount / 3) * 100}%, white 0%)`;
    button.innerText = clickCount < 3 ? `Take Shot (${clickCount}/3)` : "Analyze!";
}

// Mock screenshot function
async function takeScreenshot(container, imgPath) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Screenshot of ${container.className} saved to ${imgPath}`);
            resolve();
        }, 500);
    });
}

// Main logic for analyze button
let clickCount = 0;

document.querySelector(".analyze-button").addEventListener("click", () => {
    const confirmation = confirm("Please take 3 screenshots of 3 cube faces. Press OK to proceed or Abort to cancel.");

    if (!confirmation) return;

    const iframeContainer = document.querySelector(".iframe-container");
    if (!iframeContainer) {
        alert("Error: '.iframe-container' not found. Cannot create the buttons.");
        return;
    }

    // Ensure iframeContainer has a valid position
    const computedStyle = window.getComputedStyle(iframeContainer);
    if (!["relative", "absolute", "fixed"].includes(computedStyle.position)) {
        iframeContainer.style.position = "relative";
    }

    // Create "Take Shot" button
    const takeShotButton = document.createElement("button");
    takeShotButton.id = "take-shot-button";
    takeShotButton.innerText = "Take Shot";
    takeShotButton.style.position = "absolute";
    takeShotButton.style.bottom = "10px";
    takeShotButton.style.left = "10px";
    takeShotButton.style.padding = "10px";
    takeShotButton.style.backgroundColor = "#4CAF50";
    takeShotButton.style.color = "black";
    takeShotButton.style.border = "none";
    takeShotButton.style.cursor = "pointer";
    takeShotButton.style.borderRadius = "5px";
    takeShotButton.style.zIndex = "1000";

    // Create "Abort" button
    const abortButton = document.createElement("button");
    abortButton.id = "abort-button";
    abortButton.innerText = "Abort";
    abortButton.style.position = "absolute";
    abortButton.style.bottom = "10px";
    abortButton.style.left = "180px";
    abortButton.style.padding = "10px";
    abortButton.style.backgroundColor = "#FF5733";
    abortButton.style.color = "white";
    abortButton.style.border = "none";
    abortButton.style.cursor = "pointer";
    abortButton.style.borderRadius = "5px";
    abortButton.style.zIndex = "1000";

    // Create thumbnails container
    const thumbnailsContainer = document.createElement("div");
    thumbnailsContainer.id = "thumbnails-container";
    thumbnailsContainer.style.position = "absolute";
    thumbnailsContainer.style.bottom = "50px";
    thumbnailsContainer.style.left = "10px";
    thumbnailsContainer.style.display = "flex";
    thumbnailsContainer.style.gap = "10px";
    thumbnailsContainer.style.zIndex = "1000";

    iframeContainer.appendChild(takeShotButton);
    iframeContainer.appendChild(abortButton);
    iframeContainer.appendChild(thumbnailsContainer);

    // Handle "Take Shot" button clicks
    takeShotButton.addEventListener("click", async () => {
        if (clickCount >= 3) return;

        clickCount++;

        // Simulate taking a screenshot
        try {
            const imgPath = `../assests/img-py/image${clickCount}.jpg`;
            await takeScreenshot(iframeContainer, imgPath);

            // Create a thumbnail for the screenshot
            const thumbnail = document.createElement("img");
            thumbnail.src = imgPath;
            thumbnail.alt = `Screenshot ${clickCount}`;
            thumbnail.style.width = "50px";
            thumbnail.style.height = "50px";
            thumbnail.style.objectFit = "cover";
            thumbnail.style.borderRadius = "5px";
            thumbnail.style.cursor = "pointer";
            thumbnail.style.transition = "opacity 0.3s";
            thumbnail.dataset.index = clickCount;

            // Add hover effect for deletion
            thumbnail.addEventListener("mouseenter", () => {
                thumbnail.style.opacity = "0.6";
            });
            thumbnail.addEventListener("mouseleave", () => {
                thumbnail.style.opacity = "1";
            });

            // Handle thumbnail deletion
            thumbnail.addEventListener("click", () => {
                const indexToRemove = parseInt(thumbnail.dataset.index, 10);
                thumbnailsContainer.removeChild(thumbnail);
                clickCount--;
                updateProgressBar(takeShotButton);

                console.log(`Thumbnail ${indexToRemove} deleted.`);
            });

            thumbnailsContainer.appendChild(thumbnail);

            // Update progress
            updateProgressBar(takeShotButton);

            if (clickCount === 3) {
                takeShotButton.innerText = "Analyze!";
            }

            // Update Stages with Algo
            if (takeShotButton.innerText == "Analyze!") {
                updateStages();
            }

        } catch (error) {
            alert("Failed to take a screenshot. Please try again.");
        }
    });

    // Abort button behavior
    abortButton.addEventListener("click", () => {
        thumbnailsContainer.innerHTML = ""; // Clear all thumbnails
        takeShotButton.remove(); // Remove take-shot-button
        abortButton.remove(); // Remove abort button
        clickCount = 0; // Reset count
    });

});

// Function to update stages with cubeState data
async function updateStages() {
    let cubeState = await readCubeState();  // Fetch the cube state data

    // Assuming cubeState has a structure like:
    // {
    //     easy: [...],
    //     medium: [...],
    //     hard: [...],
    // }

    // Get the stages from cubeState, e.g., cubeState.easy
    const stages = cubeState.easy; // Use the relevant difficulty here (easy, medium, hard)

    // Clear previous content
    const stagesList = document.querySelector(".stages-list");
    stagesList.innerHTML = "";

    // Loop through each stage and create the HTML
    stages.forEach((stage, index) => {
        const stageDiv = document.createElement("div");
        stageDiv.className = "stage";
        stageDiv.dataset.index = index;

        // Create the image element
        const image = document.createElement("img");
        image.src = stage.image;
        image.alt = `${stage.header} image`;
        image.className = "stage-image";

        // Create the text div
        const textDiv = document.createElement("div");
        textDiv.className = "stage-text";

        // Create the header for the stage
        const header = document.createElement("div");
        header.className = "stage-header";
        header.innerText = stage.header; // Set header from the JSON

        // Create the content for the stage
        const content = document.createElement("div");
        content.className = "stage-content";
        content.innerText = stage.content; // Set content from the JSON

        // Append header and content to the text div
        textDiv.appendChild(header);
        textDiv.appendChild(content);

        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "stage-checkbox";

        // Add the checkbox to the stage div
        const checkboxDiv = document.createElement("div");
        checkboxDiv.className = "stage-checkbox-container";
        checkboxDiv.appendChild(checkbox);
        textDiv.appendChild(checkboxDiv);

        // Append the image and text div to the stage div
        stageDiv.appendChild(image);
        stageDiv.appendChild(textDiv);

        // Add the stage div to the stages list container
        stagesList.appendChild(stageDiv);
    });
}


// const cubeState = await sendImagesToServer();

// const transformedState = {
//     description: "A scrambled Rubik's Cube state.",
//     faces: {
//         front: cubeState['Image 1'],
//         top: cubeState['Image 2'],
//         right: cubeState['Image 3']
//     }
// };

// await writeCubeState(transformedState);
// let prompt = `this is a json: ${JSON.stringify(transformedState)}. it describes a state of a Rubik cube. you must generate a short and concise answer to this prompt, in this array format: [X,X,X,X,X,X,X], where each 'X' is an algorithm fitting each of these 7 stages: 1.Solve The White Face Of The Rubik's Cube, 2.Solve the white corners, 3.Solve The Second Layer (F2L), 4.The Yellow Cross, 5.Swap Last Layer Edges, 6.Position Last Layer Corners, 7.Orient last layer corners. example for 'X': F' L D2 L' F2 R' F. Do not give any other greeting or explanation suffix to this prompt.`;

// let algosArr = await getRubikSolutions(prompt);

// await writeCubeSolutions(algosArr);

// updateStages();


//###############################################################   read the data from the cube 

// Use `import` for external modules
const fs = require('fs');
const path = require('path');


// To get the equivalent of __dirname in an ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Read the cube state from a local JSON file
export async function readCubeState() {''
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
export async function clearCubeState() {
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
export async function writeCubeState(cubeState) {
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
export async function writeCubeSolutions(algos_arr) {
    // Define the file path for the JSON file
    const filePath = path.join(__dirname, '../json/cube_state_cache.json');

    // Load the existing JSON file
    let jsonData;
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        jsonData = JSON.parse(rawData);
    } catch (error) {
        console.error(`Error reading JSON file at ${filePath}:`, error);
        return;
    }

    // Validate that the JSON structure exists
    if (!jsonData.solutions || !jsonData.solutions.easy || !jsonData.solutions.easy.stages) {
        console.error('The JSON structure is missing required keys.');
        return;
    }

    // Ensure the stages array has the right number of stages
    const stages = jsonData.solutions.easy.stages;
    while (stages.length < algos_arr.length) {
        stages.push({ id: "", header: "", algorithm: "", notes: "" });
    }

    // Update the algorithm values in each stage
    algos_arr.forEach((algo, index) => {
        if (stages[index]) {
            stages[index].algorithm = algo;
        }
    });

    // Write the updated JSON back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log('Cube solutions written successfully to the JSON file.');
    } catch (error) {
        console.error(`Error writing to JSON file at ${filePath}:`, error);
    }
}