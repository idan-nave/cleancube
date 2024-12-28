//  *****************************************************
//  * File: rendering.js
//  * Description: main backend logic- combines rendering
//    of data containers & pushhing/pulling info from Render
//    server & OpenAIs API
//  *
//  * Author: Idan
//  * Reviewer(s): Amit
//  * Created On: 2024-12-07
//  * Last Modified By: Idan
//  * Last Modified On: 2024-12-08
//  *
//  * Version: 1.0.3
//  *
//  * Notes:
//  * - Rendering of front elements only
//  * - adding tabs for various 'difficulty'
//  * - aded hidden tab & analayzing banner
//  * - moved server-tester functionality into
//      loading-tab-listener
//  *****************************************************/

// // JavaScript code starts below


import { sendImagesToServer } from './photo.js';

async function getRubikSolutions(promptData) {
  try {
    const response = await fetch("https://ai-image-recognition-server.onrender.com/api/openai", {
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
      header: `Analyzing CleanCube...`,
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
      stagesList.appendChild(stageDiv);
      if (!stage.header.includes("CleanCube")) {
        stageDiv.appendChild(checkbox);
      }
    });
  }

  // Event Listener for Tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", async () => {  // Make this function async
      const difficulty = tab.dataset.difficulty;

      // Load stages for selected difficulty
      const stages = allStages[difficulty];
      await renderStages(stages);
      let DEBUG_NO_SERVER_REQ = false;
      if (difficulty === 'loading' && !DEBUG_NO_SERVER_REQ) {
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

          // Directly use the solutions array from the reply
          const solutions = reply.choices[0].message.content.split(',').map(s => s.trim().replace(/"/g, ''));

          console.log("Solutions array:", solutions);

          // Iterate over each stage in allStages.easy
          allStages.easy.forEach((stage, index) => {
            if (solutions[index]) {
              // Split the content to separate the algorithm from the notes
              const currentNotes = stage.content.split('\n')[1];  // Get the notes part (after the newline)

              // Update the content by setting the algorithm to the new solution
              stage.content = `${solutions[index]}\n${currentNotes}`;

              // Log the updated content for debugging
              console.log(`Updated stage ${index + 1}:`, stage.content);
            }
          });
          // Remove last analyzing buttons - Optional
          const thumbnailsContainer = document.querySelector("#thumbnails-container");
          const abortButton = document.querySelector("#abort-button");
          const loadImagesButton = document.querySelector("#load-images-button");
          loadImagesButton.innerText = "Done!";
          
          // After updating all the stages, re-render the updated stages
          renderStages(allStages.easy);
          
          if (thumbnailsContainer) thumbnailsContainer.remove();
          if (abortButton) abortButton.remove();
          if (loadImagesButton) loadImagesButton.remove();

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

  // Confetti Effect on Solving
  const lastStageCheckbox = document.querySelector('.stages-list .stage:last-child .stage-checkbox');

  // Check if the last stage checkbox is checked
  // if (lastStageCheckbox) {
  //   lastStageCheckbox.addEventListener('change', () => {
  //     if (lastStageCheckbox.checked) {
  //       // Create a new script element
  //       const script = document.createElement('script');
  //       script.src = "https://run.confettipage.com/here.js";
  //       script.setAttribute('data-confetticode', "U2FsdGVkX18FlfR1dqpM92fsgIEn1KaM4GKQlc0utGokZfbTNXK4XLi2hgoH06XWHRT9YsXHGYhY3w8XqbalHBGwJ4YysmyjzHup0GRsmgWB2+bHuco6Yw8U6LdxEYJR678tUt0iV/WDhRpT9XapqpZjQ088C50YxQ83luBHQoB7YWX9PQ+SDguUEMopUs99X1N1eE883QbaENFyCvVXJlVqTtyxdyRVjyyQk0rRPAkhoURQqCL8JbH7+HoGo7mMwgLcsf89qRsY9+gFcaXQwsckj+eM6SOnAv4oMErW3KSvFR597tGgAohiyZRHE6wK01nnqg0EVtv0y0X/x4whqrtL+0vazH0JQ56/hQXHKg1vf9VQVUPZLKW3vCjZJHSzDh40U4rb99XlfF3pBTUK5vh9QfkQxgU8CaYr7A501IV0EuPokUlhDXbATA2WmKr7AnUF+2UdeUHyb4TgKHKFpryYb2kHVKHexNqVbZS68oWj/vXmg/c6xZBiLQtu87ISlMlJEUh/uc5YAv6nbgHlADDVOyZX26IxppL7+h9ort+21EvlcdINHzU9+wkDjqSaoiFT/33n+1yIe7okV0f1M6l1hRwbRht1ZVj/50Ox5XF62qesWTZUsVVrzVbpAmaJSgVBlOiddb3UF7DCeYfMxKBQvNtNiNp/JmXua3DQtgLpMnqvXv/MY05RyszDAyJX");

  //       // Append the script to the document body
  //       document.body.appendChild(script);
  //     }
  //   });
  // }


});
