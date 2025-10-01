const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle menu on click
hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Hide menu when mouse leaves the menu area
mobileMenu.addEventListener('mouseleave', () => {
    mobileMenu.classList.add('hidden');
});
