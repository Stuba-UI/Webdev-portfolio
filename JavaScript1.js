// JavaScript1.js

// Theme toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

// Typed intro
const text = "I build fast, modern websites";
const typedEl = document.getElementById("typedIntro");
const cursor = document.getElementById("cursor");
let index = 0;

function type() {
    if (index < text.length) {
        typedEl.textContent += text[index];
        index++;
        setTimeout(type, 80);
    } else {
        cursor.style.display = "none";
    }
}
type();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

function reveal() {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add('visible');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal();

// Project filtering
const projectButtons = document.querySelectorAll('.filter-btn');
const projectSearch = document.getElementById('projectSearch');
const projects = document.querySelectorAll('.project');

projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        projects.forEach(p => {
            if (filter === 'all' || p.getAttribute('data-category') === filter) {
                p.style.display = 'flex';
            } else {
                p.style.display = 'none';
            }
        });
    });
});

projectSearch.addEventListener('input', () => {
    const term = projectSearch.value.toLowerCase();
    projects.forEach(p => {
        const title = p.querySelector('h4').textContent.toLowerCase();
        if (title.includes(term)) {
            p.style.display = 'flex';
        } else {
            p.style.display = 'none';
        }
    });
});