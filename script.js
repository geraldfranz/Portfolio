document.getElementById('year').textContent = new Date().getFullYear();


const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

function closeNav() {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
}

function openNav() {
    primaryNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
}

navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.contains('open');
    isOpen ? closeNav() : openNav();
});


primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeNav();
});


const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    },
    { rootMargin: '-50% 0px -45% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach((el) => {
        el.classList.add('pre-reveal');
        revealObserver.observe(el);
    });
}
