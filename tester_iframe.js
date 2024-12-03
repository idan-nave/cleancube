document.addEventListener("DOMContentLoaded", () => {
    const notationBox = document.getElementById("notationBox");

    // Ensure the notation box starts minimized
    notationBox.classList.add("minimized");

    // Expand the notation box on hover
    notationBox.addEventListener("mouseenter", () => {
        notationBox.classList.remove("minimized");
        notationBox.classList.add("expanded");
    });

    // Minimize the notation box when the mouse leaves
    notationBox.addEventListener("mouseleave", () => {
        notationBox.classList.remove("expanded");
        notationBox.classList.add("minimized");
    });
});
