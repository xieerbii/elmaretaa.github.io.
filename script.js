document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling untuk Navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Reveal Animation
    const sections = document.querySelectorAll('.reveal');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Hanya aktifkan sekali
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport
        threshold: 0.2 // trigger saat 20% bagian terlihat
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Navbar Active Link on Scroll
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainSections = document.querySelectorAll('main section');

    const setActiveLink = () => {
        let current = '';
        mainSections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Panggil saat load untuk set awal
});