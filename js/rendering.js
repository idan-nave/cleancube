document.addEventListener("DOMContentLoaded", () => {

    const cube = document.getElementById("cube");
    // Scroll the content inside the cube to the top
    cube.contentWindow.scrollTo(0, 0);
    cube.setAttribute('scrolling', 'no');

    const tabs = document.querySelectorAll(".tab");
    const stagesContainer = document.querySelector(".stages-container");
    const stagesList = document.querySelector(".stages-list"); // Select the existing `.stages-list` container
    const clearButton = document.querySelector(".clear-button");
    const analyzeButton = document.querySelector(".analyze-button");
    
    const allStages = {
      easy: Array.from({ length: 7 }, (_, i) => ({
        header: `Stage ${i + 1}`,
        content: `Content for Stage ${i + 1}`,
        image: `../media/chain/easy/easy${i + 1}.png`,
      })),
      medium: Array.from({ length: 4 }, (_, i) => ({
        header: `Stage ${i + 1}`,
        content: `Content for Stage ${i + 1}`,
        image: `../media/chain/medium/medium${i + 1}.png`,
      })),
      hard: Array.from({ length: 5 }, (_, i) => ({
        header: `Stage ${i + 1}`,
        content: `Content for Stage ${i + 1}`,
        image: `../media/chain/hard/hard${i + 1}.png`,
      })),
    };
    
    // Keeps track of stages that were explicitly clicked
    const clickedStages = new Set();
    
    // Function to render stages
    function renderStages(stages) {
      // Clear the previous content of stages-list
      stagesList.innerHTML = "";
    
      stages.forEach((stage, index) => {
        const stageDiv = document.createElement("div");
        stageDiv.className = "stage";
        stageDiv.dataset.index = index;
    
        const image = document.createElement("img");
        image.src = stage.image;
        image.alt = `${stage.header} image`;
        image.className = "stage-image";
    
        const textDiv = document.createElement("div");
        textDiv.className = "stage-text";
    
        const header = document.createElement("div");
        header.className = "stage-header";
        header.innerText = stage.header;
    
        const content = document.createElement("div");
        content.className = "stage-content";
        content.innerText = stage.content;
    
        textDiv.appendChild(header);
        textDiv.appendChild(content);
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "stage-checkbox";
    
        // Hover event to temporarily highlight stages and tick checkboxes
        stageDiv.addEventListener("mouseover", () => {
          stagesList.querySelectorAll(".stage").forEach((sibling, i) => {
            if (i <= index) {
              sibling.classList.add("highlight");
              if (i < index && !clickedStages.has(i)) {
                sibling.querySelector(".stage-checkbox").checked = true;
              }
            }
          });
        });
    
        // Remove hover highlights and temporary ticks when the mouse moves out
        stageDiv.addEventListener("mouseout", () => {
          stagesList.querySelectorAll(".stage").forEach((sibling, i) => {
            if (i <= index && !clickedStages.has(i)) {
              sibling.classList.remove("highlight");
              sibling.querySelector(".stage-checkbox").checked = false;
            }
          });
        });
    
        // Click event to toggle sticky highlight and permanent ticks
        checkbox.addEventListener("click", (e) => {
          if (checkbox.checked) {
            // Add current and preceding stages to clickedStages
            for (let i = 0; i <= index; i++) {
              clickedStages.add(i);
              const sibling = stagesList.querySelector(`.stage[data-index="${i}"]`);
              sibling.classList.add("highlight");
              sibling.querySelector(".stage-checkbox").checked = true;
            }
          } else {
            // Remove current and succeeding stages from clickedStages
            for (let i = index; i < stages.length; i++) {
              clickedStages.delete(i);
              const sibling = stagesList.querySelector(`.stage[data-index="${i}"]`);
              sibling.classList.remove("highlight");
              sibling.querySelector(".stage-checkbox").checked = false;
            }
          }
          e.stopPropagation(); // Prevent hover effect from re-triggering
        });
    
        stageDiv.appendChild(image);
        stageDiv.appendChild(textDiv);
        stageDiv.appendChild(checkbox);
        stagesList.appendChild(stageDiv);
      });
    }
    
    // Event Listener for Tabs
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const difficulty = tab.dataset.difficulty;
    
        // Load stages for selected difficulty
        const stages = allStages[difficulty];
        renderStages(stages);
      });
    });
    
    // Clear Stages Button
    clearButton.addEventListener("click", () => {
      clickedStages.clear();
      const stages = stagesList.querySelectorAll(".stage");
      stages.forEach((stage) => {
        stage.classList.remove("highlight");
        stage.querySelector(".stage-checkbox").checked = false;
      });
    });
    
    // Analyze Stage Button
    analyzeButton.addEventListener("click", () => {
      alert("Please take 3 screenshots of 3 cube faces.");
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
            checkmark.src = '.../media/checkmark.png';
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
