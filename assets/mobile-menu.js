const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');

if (mobileMenuButton && mobileNavMenu) {
    // Toggle menu visibility on button click
    mobileMenuButton.addEventListener('click', () => {
        mobileNavMenu.classList.toggle('hidden'); // Toggle visibility
        mobileMenuButton.classList.toggle('mobile-nav-active'); // Add/remove active class for animation
    });

    // Close menu when a link is clicked
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('mobile-nav-active');
        });
    });
}
