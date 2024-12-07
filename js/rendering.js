import { sendImagesToServer } from './photo.js';

async function getRubikSolutions(promptData) {
  try {
    const response = await fetch("https://apiserver-1-pksl.onrender.com/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptData,
        max_tokens: 1000,
      }),
    });

    const responseText = await response.text(); // Get the raw response as text

    if (response.ok) {
      const data = JSON.parse(responseText);  // Try to parse JSON
      // console.log("Response from GPT-4:", data);
      return data;
    } else {
      console.error("Error:", response.statusText);
      console.error("Response body:", responseText); // Log the response body to debug
    }
  } catch (error) {
    console.error("Error communicating with server:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Example of defining cubeSolutions:
  const cubeSolutions = {
    easy: {
      stages: [
        { id: 1, header: "Create a white cross", algorithm: "F D2 F' L' D' R", notes: "Focus on solving the white edges around the yellow center." },
        { id: 2, header: "Solve the white corners", algorithm: "R U R' U' F' U' F", notes: "Match the white corner pieces to complete the first layer." },
        { id: 3, header: "Solve the 2nd layer", algorithm: "U R U' R' U' F' U F", notes: "Align the edge pieces of the middle layer." },
        { id: 4, header: "Solve the yellow cross", algorithm: "F R U R' U' F'", notes: "Align the edge pieces of the middle layer." },
        { id: 5, header: "Solve the yellow edges", algorithm: "R U R' U' R' F R F'", notes: "Align the edge pieces of the middle layer." },
        { id: 6, header: "Solve the yellow corners", algorithm: "U R Ui Li U Ri Ui L", notes: "Align the edge pieces of the middle layer." },
        { id: 7, header: "Orient the yellow corners", algorithm: "Ui Ri Ui R U Ri Ui R", notes: "Complete the top layer using orientation algorithms." }
      ]
    },
    medium: {
      stages: [
        { id: 1, header: "Create a white cross efficiently", algorithm: "F' L D2 L' F2 R' F", notes: "Use fewer moves to create the cross." },
        { id: 2, header: "Solve white corners and adjacent edges", algorithm: "R U R' U R U2 R'", notes: "Pair and place corners and adjacent edges simultaneously." },
        { id: 3, header: "Complete the second layer", algorithm: "U R' U R U F U' F'", notes: "Handle middle layer edges with fewer moves." },
        { id: 4, header: "Orient and solve the last layer", algorithm: "F R U R' U' F' R U2 R' U' R U R'", notes: "Combine orientation and permutation." }
      ]
    },
    hard: {
      stages: [
        { id: 1, header: "Build the cross using F2L concepts", algorithm: "F R' D' R2 U R' D R", notes: "Optimize white cross placement with minimal rotation." },
        { id: 2, header: "Solve first two layers (F2L)", algorithm: "U R U' R' U F U' F'", notes: "Combine corner and edge pairing in one step." },
        { id: 3, header: "Orient last layer (OLL)", algorithm: "R U2 R2 F R F' U2 R' F R F'", notes: "Orient the top face using OLL algorithms." },
        { id: 4, header: "Permute last layer (PLL)", algorithm: "U R2 U' R U R' U' R' U R'", notes: "Place the top layer pieces in the correct position." }
      ]
    }
  };

  const tabs = document.querySelectorAll(".tab");
  const stagesContainer = document.querySelector(".stages-container");
  const stagesList = document.querySelector(".stages-list");
  const clearButton = document.querySelector(".clear-button");
  const analyzeButton = document.querySelector(".analyze-button");

  const allStages = {
    easy: cubeSolutions.easy.stages.map(stage => ({
      header: `#${stage.id} - ${stage.header}`,
      content: `${stage.algorithm}\n${stage.notes}`,  // Keep the content clear with algorithm and notes
      image: `./media/chain/easy/easy${stage.id}.png`, // Make sure the image paths are correct
    })),

    medium: cubeSolutions.medium.stages.map(stage => ({
      header: `#${stage.id} - ${stage.header}`,
      content: `${stage.algorithm}\n${stage.notes}`,
      image: `./media/chain/medium/medium${stage.id}.png`,
    })),

    hard: cubeSolutions.hard.stages.map(stage => ({
      header: `#${stage.id} - ${stage.header}`,
      content: `${stage.algorithm}\n${stage.notes}`,
      image: `./media/chain/hard/hard.png`,
    })),

    loading: Array.from({ length: 1 }, (_, i) => ({
      header: `Analyzing Stage`,
      content: ``,
      image: `./media/animation.gif`,
    })),
  };


  // Keeps track of stages that were explicitly clicked
  const clickedStages = new Set();

  // Function to render stages
  async function renderStages(stages) {
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

      // if (!stage.header.includes("Analyzing")) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "stage-checkbox";
      // }

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
    tab.addEventListener("click", async () => {  // Make this function async
      const difficulty = tab.dataset.difficulty;

      // Load stages for selected difficulty
      const stages = allStages[difficulty];
      renderStages(stages);

      if (difficulty === 'loading') {
        try {
          // Call sendImagesToServer and await its result
          const result = await sendImagesToServer();
          console.log("Images processed successfully:", result);
          alert("Images processed successfully!");

          // Build the prompt to send to getRubikSolutions
          const prompt = `this is a json: ${JSON.stringify(result)}. it describes a state of a Rubik cube. you must generate a short and concise answer to this prompt, in this array format: [X,X,X,X,X,X,X], where each 'X' is an algorithm fitting each of these 7 stages:
          1. White cross,
          2. White corners,
          3. Second layer,
          4. Yellow cross,
          5. Yellow edges,
          6. Yellow corners,
          7. Orient yellow corners.
          example for 'X': F' L D2 L' F2 R' F. Do not give any other greeting or explanation suffix to this prompt.`;

          // Now await the response from getRubikSolutions
          const reply = await getRubikSolutions(prompt);
          console.log("Rubik's cube solutions:", reply);
          let solutions = JSON.parse(reply.choices[0].message.content);
          console.log(solutions);
          
          // Update the easy stages with the solutions
          cubeSolutions.easy.stages.forEach((stage, index) => {
            if (solutions[index]) {
              stage.algorithm = solutions[index];  // Update the algorithm for the stage
            }
          });

          console.log("Updated easy stages:", cubeSolutions.easy.stages);
          // Re-render the updated easy stages
          renderStages(allStages.easy);
          
        } catch (error) {
          console.error("Error while processing images:", error);
          alert("Failed to process images. Please try again.");
        }
      }
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
