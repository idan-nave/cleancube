document.addEventListener('DOMContentLoaded', () => {
    function preloadImages() {
        const images = [
            '../assests/shop/2x2-img/2x2-img1.jpeg',
            '../assests/shop/2x2-img/2x2-img2.jpeg',
            '../assests/shop/2x2-img/2x2-img3.jpeg',
            '../assests/shop/2x2-img/2x2-img4.jpeg',
            '../assests/shop/2x2-img/2x2-img5.jpeg',
            '../assests/shop/2x2-img/2x2-img6.jpeg'
        ];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }


    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', () => {
            mainImage.src = thumbnail.src; 
        });
    });


    preloadImages();
});
