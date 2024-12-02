document.addEventListener('DOMContentLoaded', () => {
    // טעינת הניווט
    const navPlaceholder = document.getElementById('nav-placeholder');
    fetch('./nav.html') // נתיב מעודכן
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

    // טעינת הפוטר
    const footerPlaceholder = document.getElementById('footer-placeholder');
    fetch('./footer.html') // נתיב מעודכן
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
