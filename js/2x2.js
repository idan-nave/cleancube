//  *****************************************************
//  * File: load-nav-footer.js
//  * Description: used as a product page template
//  *
//  * Author: Amit
//  * Reviewer(s): Idan
//  * Created On: 2024-12-06
//  * Last Modified By: Idan
//  * Last Modified On: 2024-12-08
//  *
//  * Version: 1.0.2
//  *
//  * Notes:
//  * - Replaced with product.js
//  *****************************************************/

// // JavaScript code starts below


document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    fetch('./nav.html') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load nav');
            }
            return response.text();
        })
        .then(data => {
            navPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
    const footerPlaceholder = document.getElementById('footer-placeholder');
    fetch('./footer.html') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer');
            }
            return response.text();
        })
        .then(data => {
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
