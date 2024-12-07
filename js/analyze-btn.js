//  *****************************************************
//  * File: analyze-btn.js
//  * Description: main logic for print-screen-taking buttons, user guidance
//  *
//  * Author: Idan
//  * Reviewer(s): Amit
//  * Created On: 2024-12-06
//  * Last Modified By: Idan
//  * Last Modified On: 2024-12-08
//  *
//  * Version: 1.0.4
//  *
//  * Notes:
//  * - Dynamically loaded
//  * - moved buttons below cube irame
//  *****************************************************/

// // JavaScript code starts below

let screenshotCount = 0; // Counter to track the number of screenshots
const maxScreenshots = 3; // Maximum number of screenshots allowed

document.querySelector(".analyze-button").addEventListener("click", () => {
  const confirmation = confirm("Please view 3 preloaded screenshots. Press OK to proceed or Cancel to abort.");
  if (!confirmation) return;

  const iframeContainer = document.querySelector(".iframe-container");

  if (!iframeContainer) {
    alert("Error: '.iframe-container' not found. Cannot create the buttons.");
    return;
  }

  const computedStyle = window.getComputedStyle(iframeContainer);
  if (!["relative", "absolute", "fixed"].includes(computedStyle.position)) {
    iframeContainer.style.position = "relative";
  }

  const thumbnailsContainer = document.createElement("div");
  thumbnailsContainer.id = "thumbnails-container";
  thumbnailsContainer.style.position = "absolute";
  thumbnailsContainer.style.bottom = "0px";
  thumbnailsContainer.style.left = "170px";
  thumbnailsContainer.style.display = "flex";
  thumbnailsContainer.style.gap = "10px";
  thumbnailsContainer.style.zIndex = "1000";

  iframeContainer.appendChild(thumbnailsContainer);

  const loadImagesButton = document.createElement("button");
  loadImagesButton.id = "load-images-button";
  loadImagesButton.innerText = `Load Images (${screenshotCount}/${maxScreenshots})`;
  loadImagesButton.style.position = "absolute";
  loadImagesButton.style.bottom = "10px";
  loadImagesButton.style.left = "30px";
  loadImagesButton.style.padding = "10px";
  loadImagesButton.style.backgroundColor = "#4CAF50";
  loadImagesButton.style.color = "black";
  loadImagesButton.style.border = "none";
  loadImagesButton.style.cursor = "pointer";
  loadImagesButton.style.borderRadius = "5px";
  loadImagesButton.style.zIndex = "1000";

  const abortButton = document.createElement("button");
  abortButton.id = "abort-button";
  abortButton.innerText = "Abort";
  abortButton.style.position = "absolute";
  abortButton.style.bottom = "10px";
  abortButton.style.right = "30px";
  abortButton.style.padding = "10px";
  abortButton.style.backgroundColor = "#FF5733";
  abortButton.style.color = "white";
  abortButton.style.border = "none";
  abortButton.style.cursor = "pointer";
  abortButton.style.borderRadius = "5px";
  abortButton.style.zIndex = "1000";

  iframeContainer.appendChild(loadImagesButton);
  iframeContainer.appendChild(abortButton);

  abortButton.addEventListener("click", () => {
    loadImagesButton.remove();
    abortButton.remove();
    thumbnailsContainer.innerHTML = ""; // Clear thumbnails
    screenshotCount = 0; // Reset counter
    alert("Action aborted!");
  });

  loadImagesButton.addEventListener("click", () => {
    if (screenshotCount >= maxScreenshots) {
      alert("You have already loaded all images.");
      return;
    }

    loadPreloadedImages(thumbnailsContainer);
    screenshotCount++;
    updateProgressBar(loadImagesButton);
  });
});

function loadPreloadedImages(thumbnailsContainer) {
  const imagePaths = [
    "../assests/img-py/image1-backup.jpg",
    "../assests/img-py/image2-backup.jpg",
    "../assests/img-py/image3-backup.jpg",
  ];

  if (screenshotCount >= imagePaths.length) {
    console.error(`No more images to load for index ${screenshotCount}`);
    alert("No more images to load.");
    return;
  }

  const imagePath = imagePaths[screenshotCount];

  const thumbnail = document.createElement("img");
  thumbnail.src = imagePath;
  thumbnail.alt = `Screenshot ${screenshotCount + 1}`;
  thumbnail.style.width = "60px";
  thumbnail.style.height = "60px";
  thumbnail.style.objectFit = "cover";
  thumbnail.style.borderRadius = "5px";
  thumbnail.style.cursor = "pointer";
  thumbnail.style.transition = "opacity 0.3s";

  thumbnail.addEventListener("mouseenter", () => {
    thumbnail.style.opacity = "0.6";
  });
  thumbnail.addEventListener("mouseleave", () => {
    thumbnail.style.opacity = "1";
  });

  thumbnailsContainer.appendChild(thumbnail);
}

function updateProgressBar(button) {
  if (screenshotCount < maxScreenshots) {
    button.innerText = `Load Images (${screenshotCount}/${maxScreenshots})`;
  } else {
    button.innerText = "Analyzing...";
    button.disabled = true;


    // Remove buttons - Optional
    // const thumbnailsContainer = document.querySelector("#thumbnails-container");
    // const abortButton = document.querySelector("#abort-button");
    // if (thumbnailsContainer) thumbnailsContainer.remove();
    // if (abortButton) abortButton.remove();

    // Select the hidden tab
    const loadingTab = document.querySelector('.tab.loading');

    // Dispatch a click event on the hidden tab
    if (loadingTab) {
      const clickEvent = new Event('click');
      loadingTab.dispatchEvent(clickEvent);
      console.log("loadingTab clicked programmatically.");
    }
  }
}