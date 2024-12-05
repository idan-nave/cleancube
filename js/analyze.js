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

        // Rearrange filenames and logic as needed
        console.log(`Thumbnail ${indexToRemove} deleted.`);
      });

      thumbnailsContainer.appendChild(thumbnail);

      // Update progress
      updateProgressBar(takeShotButton);

      if (clickCount === 3) {
        takeShotButton.innerText = "Analyze!";
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

// Mock server communication
async function sendImagesToServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // Simulate 80% success rate
      if (success) {
        resolve({ state: "Analyzed Cube State" });
      } else {
        reject(new Error("Server error"));
      }
    }, 2000);
  });
}
