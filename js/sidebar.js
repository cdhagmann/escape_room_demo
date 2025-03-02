// DOM elements for sidebar
let themeSelect;
let sidebarDrawer;
let restartButton;

// Theme management
function changeTheme() {
    const theme = themeSelect.value;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('escapeRoomTheme', theme);
}

// Initialize sidebar elements
function initSidebar() {
    themeSelect = document.getElementById('theme-select');
    sidebarDrawer = document.getElementById('sidebar-drawer');
    restartButton = document.getElementById('restart-button');
    
    // Theme selector event listener
    themeSelect.addEventListener('change', changeTheme);
    
    // Set current theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('escapeRoomTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSelect.value = savedTheme;
    
    // Restart button event listener
    restartButton.addEventListener('click', restartGame);
    
    // Handle sidebar toggle for mobile
    if (window.innerWidth < 1024) {
        // Default to closed on mobile
        sidebarDrawer.checked = false;
    }
}

// Close sidebar on mobile when starting game
function closeSidebar() {
    if (window.innerWidth < 1024) {
        sidebarDrawer.checked = false;
    }
}

// Open sidebar when restarting game
function openSidebarOnRestart() {
    if (window.innerWidth < 1024) {
        sidebarDrawer.checked = true;
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', initSidebar);
