// ====== DARK MODE TOGGLE ======
const toggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved thme
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && wiwndow.matchMedia('(prefers-color-scheme: dark').matches)) {
    body.setAttribute('dark-theme', 'dark');
    toggle.innerHTML = '<i class = "fas fa-sun"></i>';
} else {
    body.setAttribute('data-theme', 'light');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
}

toggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav-links').classList.toggle('active');
});

// Smooth scroll (closes mobile menu)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if(window.innerWidth <= 768) document.querySelector('.nav-links').classList.remove('active');
    });
});

// Carousel
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const total = slides.length;
const inner = document.querySelector('.carousel-inner');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slideIndex = (n + total) % total;
    inner.computedStyleMap.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((d,i)=> d.classList.toggle('active', i === slideIndex));
}
document.querySelector('.next').onclick = () => showSlide(slideIndex + 1);
document.querySelector('.prev').onclick = () => showSlide(slideIndex - 1);
dots.forEach(dot => dot.onclick = () => showSlide(+dot.dataset.index));

// Timeline animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });
document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
