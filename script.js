
document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 40) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
   
    const counters = document.querySelectorAll('[data-count]');
    const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1800;
            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased).toLocaleString('pl-PL');
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target.toLocaleString('pl-PL');
            };
            requestAnimationFrame(step);
            counterIO.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
    
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-q');
        const ans = item.querySelector('.faq-a');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            // zamknij wszystkie
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-a').style.maxHeight = null;
            });
            if (!isOpen) {
                item.classList.add('active');
                ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });

    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        // prosta walidacja
        for (const [, v] of data.entries()) {
            if (!String(v).trim()) {
                msg.style.color = '#ff8b8b';
                msg.textContent = 'Uzupełnij wszystkie pola formularza.';
                return;
            }
        }
        msg.style.color = '';
        msg.textContent = 'Dziękujemy! Skontaktujemy się w ciągu 30 minut.';
        form.reset();
        setTimeout(() => { msg.textContent = ''; }, 6000);
    });
    
    document.getElementById('year').textContent = new Date().getFullYear();
});
const cookieOverlay = document.getElementById("cookieOverlay");
const acceptCookies = document.getElementById("acceptCookies");
const closeCookies = document.getElementById("closeCookies");

const cookieConsent = localStorage.getItem("cookieConsent");

if (!cookieConsent && cookieOverlay) {
  cookieOverlay.classList.add("active");
}

if (acceptCookies) {
  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookieOverlay.classList.remove("active");
  });
}

if (closeCookies) {
  closeCookies.addEventListener("click", function () {
    cookieOverlay.classList.remove("active");
  });
}