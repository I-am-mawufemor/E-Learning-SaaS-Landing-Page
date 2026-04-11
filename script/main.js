// main.js

document.addEventListener('DOMContentLoaded', function () {

    // ─── Navigation ───
    const sidenav = document.getElementById("mySidenav");
    const overlay = document.querySelector(".sidenav-overlay");

    function openNav() {
        if (sidenav) sidenav.style.width = "250px";
        if (overlay) overlay.classList.add("active");
    }

    function closeNav() {
        if (sidenav) sidenav.style.width = "0";
        if (overlay) overlay.classList.remove("active");
    }

    // Attach nav events via addEventListener instead of HTML onclick
    const openBtn = document.querySelector(".nav-open-btn");
    const closeBtn = document.querySelector(".nav-close-btn");

    if (openBtn) openBtn.addEventListener("click", openNav);
    if (closeBtn) closeBtn.addEventListener("click", closeNav);

    // Close nav when overlay is clicked
    if (overlay) overlay.addEventListener("click", closeNav);


    // ─── Stats: Counter Animation ───
    function animateCounter(element, target, suffix, duration = 1500) {

        // Guard — skip if element doesn't exist
        if (!element) return;

        // Reset to 0 before animating
        element.textContent = "0" + suffix;

        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    function runAllCounters() {
        animateCounter(document.querySelector('.stat-card-1 h2'), 1000,   '+');
        animateCounter(document.querySelector('.stat-card-2 h2'), 350, '+');
        animateCounter(document.querySelector('.stat-card-3 h2'), 120, '+');
        animateCounter(document.querySelector('.stat-card-4 h2'), 40,  '+');
    }


    // ─── Stats: Scroll Trigger ───
    const statCards = document.querySelector('.stat-cards');

    // Guard — only run observer if stat-cards exists in the DOM
    if (statCards) {

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statCards.classList.add('in-view'); // triggers CSS fadeUp
                    runAllCounters();                   // triggers JS counter
                    statsObserver.disconnect();         // run once only
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statCards);
    }

});