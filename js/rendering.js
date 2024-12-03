document.addEventListener("DOMContentLoaded", () => {

    const iframe = document.getElementById("cube");
    // Scroll the content inside the iframe to the top
    iframe.contentWindow.scrollTo(0, 0);
    iframe.setAttribute('scrolling', 'no');
    
    //Add grabbing curser to the cube
    // IFRAME EXISTS SOMEWHWE CAUSE scrolling:NO WORKS! BUT WHERE IS IT?!
    // // Apply the grabbing cursor style when mouse is over the container
    // iframe.addEventListener('mousedown', function () {
    //     iframe.style.cursor = 'grabbing';
    // });
    // // Reset the cursor to default when mouse is released
    // iframe.addEventListener('mouseup', function () {
    //     iframe.style.cursor = 'default';
    // });
    // // Optionally, reset the cursor when the mouse leaves the container
    // iframe.addEventListener('mouseleave', function () {
    //     iframe.style.cursor = 'default';
    // });

    // Stages content
    const stages = {
        1: "Stage 1: Create a white cross. Algorithm: F R U R' U' F'",
        2: "Stage 2: Solve the white corners. Algorithm: R U R' U'",
        3: "Stage 3: Solve the middle layer edges. Algorithm: U R U' R' U' F' U F",
        4: "Stage 4: Solve the top layer. Algorithm: R U2 R2 U' R2 U' R2 U2 R",
    };
    let doneCount = 1;

    // Toggle stage content expansion (accordion behavior)
    document.querySelectorAll('.stage').forEach(stage => {
        stage.addEventListener('click', () => {
            // Collapse all stages first
            document.querySelectorAll('.stage').forEach(s => {
                s.classList.remove('expanded');
            });

            // Then expand the clicked stage
            stage.classList.toggle('expanded');

            // Update active stage styling
            document.querySelectorAll('.stage').forEach(s => {
                s.classList.remove('active');
            });
            stage.classList.add('active');
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
            checkmark.src = 'media/checkmark.png'; // Replace with the actual checkmark image URL
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


});
