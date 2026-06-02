const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('sidebar-toggle');
const overlay = document.getElementById('sidebar-overlay');
const sidebarWidth = 280;

let isDragging = false;
let startX = 0;
let currentTranslateX = -sidebarWidth;
let isOpen = false;

function setSmooth(enable) {
    if (enable) {
        sidebar.classList.add('smooth-transition');
        toggleBtn.classList.add('smooth-transition');
        overlay.classList.add('smooth-transition');
    } else {
        sidebar.classList.remove('smooth-transition');
        toggleBtn.classList.remove('smooth-transition');
        overlay.classList.remove('smooth-transition');
    }
}

function updateSidebarPosition(x) {
    currentTranslateX = Math.min(0, Math.max(-sidebarWidth, x));
    sidebar.style.transform = `translateX(${currentTranslateX}px)`;
    
    let toggleLeft = sidebarWidth + currentTranslateX;
    toggleBtn.style.left = `${toggleLeft}px`;
    
    let precentOpen = (sidebarWidth + currentTranslateX) / sidebarWidth;
    toggleBtn.style.transform = `rotate(${precentOpen * 180}deg)`;

    if (currentTranslateX > -sidebarWidth) {
        overlay.style.display = 'block';
        overlay.style.opacity = precentOpen * 0.4;
    } else {
        overlay.style.display = 'none';
    }
}

function openSidebar() { setSmooth(true); updateSidebarPosition(0); isOpen = true; }
function closeSidebar() { setSmooth(true); updateSidebarPosition(-sidebarWidth); isOpen = false; }
function toggleSidebar() { if (isOpen) closeSidebar(); else openSidebar(); }

// Praćenje prsta sa ivice ekrana
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    if (startX < 40 || isOpen) {
        isDragging = true;
        setSmooth(false);
    }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    let currentX = e.touches[0].clientX;
    let deltaX = currentX - startX;
    let targetX = isOpen ? deltaX : -sidebarWidth + deltaX;
    updateSidebarPosition(targetX);
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    if (currentTranslateX > -sidebarWidth / 2) openSidebar();
    else closeSidebar();
});
