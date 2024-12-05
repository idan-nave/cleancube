document.addEventListener("DOMContentLoaded", () => {

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

});
