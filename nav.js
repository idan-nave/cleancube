document.addEventListener('DOMContentLoaded', () => {

    const navPlaceholder = document.getElementById('nav-placeholder');
    fetch('nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load navigation bar');
            }
            return response.text();
        })
        .then(data => {
            navPlaceholder.innerHTML = data;

            const nav = document.querySelector('.global-nav');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            const cartIcon = document.querySelector('.cart-icon img');
            cartIcon.addEventListener('click', () => {
                cartIcon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 300);
            });
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
});
