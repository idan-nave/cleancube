document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.getElementById("main-image");
    const thumbnails = document.querySelectorAll(".thumbnail-images img");

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("mouseover", function () {
            mainImage.src = this.getAttribute("data-src");
        });
    });
});
