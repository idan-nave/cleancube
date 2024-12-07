document.addEventListener('DOMContentLoaded', () => {
    // nav content
    const navHTML = `
    <nav class="global-nav">
        <div class="nav-container">
            <ul class="nav-links">
                <li>
                    <a href="./index.html">
                        <img src="./media/home.svg" alt="Home">
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="./shop.html">
                        <img id="shopBtn" src="./media/shop.svg" alt="Our Store">
                        <span>Shop</span>
                    </a>
                </li>
                <li class="dropdown">
                    <a href="#solutions" class="dropdown-toggle">
                        <img src="./media/algo.svg" alt="Cubics Algorithms">
                        <span>Algorithms</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="./2x2-guide.html">2x2</a></li>
                        <li><a href="./3x3-guide.html">3x3</a></li>
                        <li><a href="./4x4-guide.html">4x4</a></li>
                        <li><a href="./pyraminx-guide.html">Pyraminx</a></li>
                        <li><a href="./skewb-guide.html">Skewb</a></li>
                    </ul>
                </li>
                <li>
                    <a href="./cart.html">
                        <img src="./media/cart.svg" alt="My Cart">
                        <span>Cart</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
`;

        const footerHTML = `
    <footer class="global-footer">
        <div class="footer-content">
            <div class="social-icons">
                <h3>Follow Us</h3>
                <div class="icon-row">
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
            <ul class="footer-links">
                <h3>Quick Links</h3>
                <li><a href="./about.html">About</a></li>
                <li><a href="./privacy.html">Privacy Policy</a></li>
                <li><a href="./contactus.html">Contact</a></li>
            </ul>
            <div class="footer-contact">
                <h3>Contact</h3>
                <p>Email: support@CleanCube.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: David Ben Gurion 7 TLV</p>
            </div>
        </div>
        <p class="footer-bottom">&copy; 2024 CleanCube. All rights reserved.</p>
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
