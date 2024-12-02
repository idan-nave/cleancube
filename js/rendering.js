document.addEventListener("DOMContentLoaded", () => {

    // Stages content
    const stages = {
        1: "Stage 1: Create a white cross. Algorithm: F R U R' U' F'",
        2: "Stage 2: Solve the white corners. Algorithm: R U R' U'",
        3: "Stage 3: Solve the middle layer edges. Algorithm: U R U' R' U' F' U F",
        4: "Stage 4: Solve the top layer. Algorithm: R U2 R2 U' R2 U' R2 U2 R",
    };

    // Toggle stage content expansion
    document.querySelectorAll('.stage').forEach(stage => {
        stage.addEventListener('click', () => {
            // Toggle the 'expanded' class on the stage
            stage.classList.toggle('expanded');

            // Update active stage styling
            document.querySelectorAll('.stage').forEach(stage => {
                stage.classList.remove('active');
            });
            stage.classList.add('active');

            // Update algorithm content
            const algorithmBox = document.getElementById('algorithm-box');
            const stageNumber = stage.id.replace('stage', '');
            algorithmBox.textContent = stages[stageNumber] || "Algorithm not available.";
        });
    });

    // Call simulateMouseDrag from another script with parameters
    setTimeout(function() {
        window.simulateMouseDrag(100, 100, 500, 500, 2000); // Drag from (100, 100) to (500, 500) in 2 seconds
    }, 2000); // Call after a delay (2 seconds)

    // Call this whenever you need to trigger the drag
    dragCubeHandler(3000);
});