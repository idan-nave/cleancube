document.addEventListener("DOMContentLoaded", () => {

    // Stages content
    const stages = {
        1: "Stage 1: Create a white cross. Algorithm: F R U R' U' F'",
        2: "Stage 2: Solve the white corners. Algorithm: R U R' U'",
        3: "Stage 3: Solve the middle layer edges. Algorithm: U R U' R' U' F' U F",
        4: "Stage 4: Solve the top layer. Algorithm: R U2 R2 U' R2 U' R2 U2 R",
    };

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

});