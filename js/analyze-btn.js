import { sendImagesToServer } from './photo.js';


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
    thumbnailsContainer.style.bottom = "10px";
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
    loadImagesButton.style.left = "10px";
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
    abortButton.style.right = "10px";
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
      button.innerText = "All Images Loaded!";
      button.disabled = true;
  
      sendImagesToServer()
        .then((result) => {
          console.log("Images processed successfully:", result);
          alert("Images processed successfully!");
        })
        .catch((error) => {
          console.error("Error while processing images:", error);
          alert("Failed to process images. Please try again.");
        });
    }
  }