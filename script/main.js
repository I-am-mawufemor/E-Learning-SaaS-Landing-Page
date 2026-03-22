// main.js

// ─── Navigation ───
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".sidenav-overlay").classList.add("active");
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".sidenav-overlay").classList.remove("active");
}

// ─── Stats: Counter Animation ───
function animateCounter(element, target, suffix, duration = 1500) {
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
    animateCounter(document.querySelector('.stat-card-1 h2'), 1,   'M+');
    animateCounter(document.querySelector('.stat-card-2 h2'), 350, '+');
    animateCounter(document.querySelector('.stat-card-3 h2'), 120, '+');
    animateCounter(document.querySelector('.stat-card-4 h2'), 40,  '+');
}

// ─── Stats: Scroll Trigger (one observer, both effects) ───
const statCards = document.querySelector('.stat-cards');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statCards.classList.add('in-view'); // triggers CSS fadeUp
            runAllCounters();                   // triggers JS counter
            statsObserver.disconnect();         // fire once only
        }
    });
}, { threshold: 0.2 });

statsObserver.observe(statCards);