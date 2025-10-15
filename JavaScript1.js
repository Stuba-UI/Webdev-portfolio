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

projectSearch?.addEventListener('input', () => {
    const term = projectSearch.value.toLowerCase();
    projects.forEach(p => {
        const title = p.querySelector('h4').textContent.toLowerCase();
        p.style.display = title.includes(term) ? 'flex' : 'none';
    });
});

// Skill chart setup
const ctx = document.getElementById('skillChart').getContext('2d');
let currentLang = 'en';
let skillChart;

function createChart(lang) {
    const labels = lang === 'fi'
        ? ['HTML', 'CSS', 'JavaScript', 'Python', 'Git', 'Suunnittelu']
        : ['HTML', 'CSS', 'JavaScript', 'Python', 'Git', 'Design'];

    if (skillChart) skillChart.destroy();

    skillChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: lang === 'fi' ? 'Taitotaso' : 'Skill level',
                data: [90, 85, 80, 90, 75, 60],
                backgroundColor: 'rgba(96,165,250,0.6)',
                borderColor: 'rgba(96,165,250,1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
createChart('en');

fetch('https://api.github.com/users/Stuba-UI/repos?sort=updated')
    .then(res => res.json())
    .then(repos => {
        const list = document.getElementById('github-projects');
        repos.forEach(repo => {
            const div = document.createElement('div');
            div.className = 'project';
            div.innerHTML = `
        <h4>${repo.name}</h4>
        <p>${repo.description || 'No description'}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
            list.appendChild(div);
        });
    });


// Language toggle
const langToggle = document.getElementById("langToggle");
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fi" : "en";

    document.querySelectorAll("[data-en]").forEach(el => {
        if (!["INPUT", "TEXTAREA", "CANVAS"].includes(el.tagName)) {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        }
    });

    // Update CV link
    const cvBtn = document.getElementById("cvBtn");
    cvBtn.href = currentLang === "en"
        ? "English Version – Tuomas Lehto CV.pdf"
        : "English Version – Tuomas Lehto CV.pdf";

    // Update chart language
    createChart(currentLang);
});
