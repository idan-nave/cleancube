document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.createElement('footer');
    footerContainer.classList.add('global-footer');

    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer);
        })
        .catch(error => console.error('Error loading footer:', error));
});
