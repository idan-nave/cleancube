// Function to simulate mouse events
function simulateMouseEvent(type, clientX, clientY) {
    const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: clientX,
        clientY: clientY,
        button: 0, // Left mouse button
    });
    document.getElementById('drag-element').dispatchEvent(event);
}

// Function to simulate mouse drag (move + click)
function simulateMouseDrag(fromX, fromY, toX, toY, duration) {
    const dragElement = document.getElementById('drag-element');

    // Block the user's mouse during the dragging
    document.body.style.pointerEvents = 'none';

    // Set the initial position of the element
    dragElement.style.left = `${fromX}px`;
    dragElement.style.top = `${fromY}px`;

    // Simulate mousedown
    simulateMouseEvent('mousedown', fromX, fromY);

    // Move the mouse gradually (simulate dragging)
    const startTime = Date.now();

    function moveMouse() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure the progress does not exceed 1

        // Calculate intermediate position
        const currentX = fromX + (toX - fromX) * progress;
        const currentY = fromY + (toY - fromY) * progress;

        // Update the position of the drag element
        dragElement.style.left = `${currentX}px`;
        dragElement.style.top = `${currentY}px`;

        // Simulate mousemove
        simulateMouseEvent('mousemove', currentX, currentY);

        if (progress < 1) {
            requestAnimationFrame(moveMouse); // Continue moving until the duration is reached
        } else {
            // Simulate mouseup after the move is complete
            simulateMouseEvent('mouseup', currentX, currentY);

            // Unblock the user's mouse after dragging is complete
            document.body.style.pointerEvents = 'auto';
        }
    }

    moveMouse();
}

// Function to calculate the coordinates of the two farthest points (top-left and bottom-right)
function calculateCubeContainerXY() {
    const cubeContainer = document.querySelector('.iframe-container');
    
    if (!cubeContainer) {
        console.error('Element with class "iframe-container" not found');
        return null;
    }

    const rect = cubeContainer.getBoundingClientRect();
    
    // Get the coordinates for top-left and bottom-right corners
    const fromX = rect.left;
    const fromY = rect.top;
    const toX = rect.right;
    const toY = rect.bottom;

    return { fromX, fromY, toX, toY };
}

// Function to handle the cube dragging
function dragCubeHandler(duration) {
    const coordinates = calculateCubeContainerXY();

    if (!coordinates) {
        return;
    }

    const { fromX, fromY, toX, toY } = coordinates;
    
    // Trigger dragging (simulate mouse drag from top-left to bottom-right)
    simulateMouseDrag(fromX, fromY, toX, toY, duration);
}

// Expose the dragCubeHandler function globally so it can be called from other scripts
window.dragCubeHandler = dragCubeHandler;
