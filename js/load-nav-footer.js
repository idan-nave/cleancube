document.addEventListener('DOMContentLoaded', () => {
    // תוכן הניווט
   // תוכן הניווט
const navHTML = `
<nav class="global-nav">
    <div class="nav-container">
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#shop">Our Store</a></li>
            <li class="dropdown">
                <a href="#solutions" class="dropdown-toggle">Cubics Algorithms</a>
                <ul class="dropdown-menu">
                    <li><a href="#2x2">2x2</a></li>
                    <li><a href="#3x3">3x3</a></li>
                    <li><a href="#4x4">4x4</a></li>
                    <li><a href="#5x5">5x5</a></li>
                    <li><a href="#6x6">6x6</a></li>
                    <li><a href="#pyraminx">Pyraminx</a></li>
                    <li><a href="#megaminx">Megaminx</a></li>
                </ul>
            </li>
            <li><a href="#cart">My Cart</a></li>
        </ul>
    </div>
</nav>
`;


    // תוכן הפוטר
    const footerHTML = `
        <footer class="global-footer">
            <div class="footer-content">
                <p>&copy; 2024 Rubik's Cube Fan Page. All rights reserved.</p>
                <ul class="footer-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div class="social-icons">
                    <a href="https://www.facebook.com/yourpage" target="_blank" class="icon">
                        <img src="./assests/footer/whatsapp.png" alt="WhatsApp">
                    </a>
                    <a href="https://www.facebook.com/yourpage" target="_blank" class="icon">
                        <img src="./assests/footer/facebook.png" alt="Facebook">
                    </a>
                    <a href="https://twitter.com/yourhandle" target="_blank" class="icon">
                        <img src="./assests/footer/twitter.png" alt="Twitter">
                    </a>
                    <a href="https://www.instagram.com/yourprofile" target="_blank" class="icon">
                        <img src="./assests/footer/instagram.png" alt="Instagram">
                    </a>
                </div>
            </div>
        </footer>
    `;

    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = navHTML;
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
});
