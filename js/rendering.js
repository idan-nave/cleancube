document.addEventListener("DOMContentLoaded", () => {

    const cube = document.getElementById("cube");
    // Scroll the content inside the cube to the top
    cube.contentWindow.scrollTo(0, 0);
    cube.setAttribute('scrolling', 'no');

    const tabs = document.querySelectorAll(".tab");
    const containers = document.querySelectorAll(".stages-container");

    // Algo Tabs Styles
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("active"));

            // Hide all containers
            containers.forEach(container => (container.style.display = "none"));

            // Activate the selected tab
            tab.classList.add("active");

            // Show the related container
            const targetId = `${tab.dataset.tab}-container`;
            document.getElementById(targetId).style.display = "flex";
        });
    });

    // Fetch and render data dynamically from the solution JSON file
    let rubiksCubeData = null;

    async function fetchRubiksCubeData() {
        try {
            const response = await fetch('rubiksCubeData.json'); // Path to your JSON file
            rubiksCubeData = await response.json();
            // Default to loading the "easy" stages after fetching
            renderStages(rubiksCubeData.solutions.easy.stages);
        } catch (error) {
            console.error('Error fetching the JSON data:', error);
        }
    }

    // Function to render stages into the stages-container
    function renderStages(stages) {
        const container = document.querySelector('.stages-container');
        container.innerHTML = ''; // Clear existing stages
        stages.forEach(stage => {
            const stageElement = document.createElement('div');
            stageElement.classList.add('stage');
            stageElement.innerHTML = `
            <div class="stage-header">${stage.header}</div>
            <div class="stage-content">${stage.algorithm}</div>
        `;
            container.appendChild(stageElement);
        });
    }

    // Tab click event handler
    function handleTabClick(event) {
        const difficulty = event.target.getAttribute('data-difficulty');
        if (rubiksCubeData) {
            const stages = rubiksCubeData.solutions[difficulty].stages;
            renderStages(stages);
        }
    }

    // Attach event listeners to tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    // Fetch the JSON data and initialize the default view
    fetchRubiksCubeData();


    // Track the number of completed stages
    let doneCount = 1;
    // Create stages dynamically
    const container = document.querySelector('.stages-container');

    stagesData.forEach(stage => {
        // Create the main stage div
        const stageDiv = document.createElement("div");
        stageDiv.className = "stage";
        stageDiv.id = stage.id;

        // Create the stage header
        const stageHeader = document.createElement("div");
        stageHeader.className = "stage-header";
        stageHeader.textContent = stage.header;

        // Create the stage content div
        const stageContent = document.createElement("div");
        stageContent.className = "stage-content";

        // Create the algorithm box
        const algorithmBox = document.createElement("div");
        algorithmBox.className = "algorithm-box";
        algorithmBox.textContent = `Algorithm: ${stage.algorithm}`;

        // Assemble the elements
        stageContent.appendChild(algorithmBox);
        stageDiv.appendChild(stageHeader);
        stageDiv.appendChild(stageContent);

        // Append the stage to the container
        container.appendChild(stageDiv);
    });

    // Add accordion behavior
    document.querySelectorAll('.stage').forEach(stage => {
        stage.addEventListener('click', () => {
            // Collapse all stages first
            document.querySelectorAll('.stage').forEach(s => {
                s.classList.remove('expanded', 'active');
            });

            // Then expand the clicked stage
            stage.classList.add('expanded', 'active');
        });
    });

    // Button functionality: "I'm done with Stage ${stageNumber}"
    const doneBtn = document.getElementById("doneBtn");
    doneBtn.addEventListener("click", function () {
        const stageNumber = 1; // This can be dynamically set based on the current stage
        const stageElement = document.getElementById(`stage${stageNumber}`);

        if (stageElement && doneCount <= stageNumber) {
            // Increment Done Count
            doneCount++;
            doneBtn.textContent = `Stage ${doneCount} Done!`;
            // Create the new "Done" element with checkmark
            const doneElement = document.createElement('div');
            doneElement.classList.add('done-mark');  // Add class for styling

            // Create "Done" text
            const doneText = document.createElement('span');
            doneText.textContent = "Done";

            // Create checkmark image
            const checkmark = document.createElement('img');
            checkmark.src = '../media/checkmark.png';
            checkmark.alt = 'Done';
            checkmark.style.width = '20px';

            // Append text and checkmark to the new element
            doneElement.appendChild(doneText);
            doneElement.appendChild(checkmark);

            // Insert the new "Done" element after the current stage
            stageElement.parentNode.insertBefore(doneElement, stageElement);
        }
    });

    // Button functionality: "I've lost it"
    const lostBtn = document.getElementById("lostBtn");
    const messageBox = document.getElementById("messageBox");
    const messageText = document.getElementById("hintBox");
    const messageContent = document.getElementById("messageContent");
    const hintBox = document.getElementById("messageBox");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    lostBtn.addEventListener("click", function () {
        messageBox.style.display = "block"; // Show the message box
        messageBox.classList.remove("minimized");
        messageBox.classList.add("expanded");
        messageContent.style.display = "block"; // Show the message-content

    });

    // When mouse enters the minimized message box, expand it
    messageBox.addEventListener("mouseenter", function () {
        messageBox.classList.remove("minimized");
        messageBox.classList.add("expanded");
        messageContent.style.display = "block"; // Show the message-content
        // hintBox.style.display = "none"; // hide the hint-box
    });

    // When mouse leaves the expanded message box, minimize it back
    messageBox.addEventListener("mouseleave", function () {
        messageBox.classList.remove("expanded");
        messageBox.classList.add("minimized");
        messageContent.style.display = "none"; // hide the message-content
        hintBox.style.display = "block"; // Show the hint-box
    });


    // Handling "Yes" button in the message box
    yesBtn.addEventListener("click", function () {
        // messageText.textContent = "Cool! So just redo the algorithm for this stage again.";
        // messageBox.style.backgroundColor = "green"; // Change message box color to green
    });

    // Handling "No" button in the message box
    noBtn.addEventListener("click", function () {
        // messageText.textContent = "Ahh! Let's go back to Stage ${stageNumber}-1. You did it once, you'll do it better.";
        // messageBox.style.backgroundColor = "red"; // Change message box color to red
    });

    const notationBox = document.getElementById("notationBox");
    const notationContent = document.getElementById("notationContent");


    // Ensure the notation box starts minimized
    notationBox.classList.add("minimized");

    // Expand the notation box on hover
    notationBox.addEventListener("mouseenter", () => {
        notationBox.classList.remove("minimized");
        notationBox.classList.add("expanded");
        notationContent.style.display = "block"; // Show the notation-content
        // Scroll the content inside the cube to the top
        notationContent.onload = () => {
            notationContent.contentWindow.scrollTo(0, 600); // Scroll the iframe to the desired position
        };

        // Scroll the iframe to the desired position
        notationContent.setAttribute('scrolling', 'no');
    });

    // Minimize the notation box when the mouse leaves
    notationBox.addEventListener("mouseleave", () => {
        notationBox.classList.remove("expanded");
        notationBox.classList.add("minimized");
        notationBox.style.display = "block"; // Show the hint-box
        notationContent.style.display = "none"; // hide the notation-content
    });


});
