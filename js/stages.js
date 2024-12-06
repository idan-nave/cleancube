
// Function to load stages based on difficulty
async function loadStages(difficulty) {
    try {
        let cubeState = await readCubeState(); // Fetch the cube state data

        // Get the stages based on the provided difficulty (easy, medium, hard)
        const stages = cubeState[difficulty]; // Access the relevant difficulty stages

        if (!stages) {
            console.error(`No stages found for difficulty: ${difficulty}`);
            return;
        }

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
            header.innerText = stage.header;

            // Create the content for the stage
            const content = document.createElement("div");
            content.className = "stage-content";
            content.innerText = stage.content;

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
    } catch (error) {
        console.error("Error loading stages:", error);
    }
}