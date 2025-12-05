document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SMART HEADER (Hide on Scroll Down) ---
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- 2. STATS COUNTER (NEW: MOVING BIG NUMBERS) ---
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    const startCount = (el) => {
        const goal = parseFloat(el.getAttribute('data-count'));
        let count = 0;
        
        // Calculate step so all numbers finish in 2 seconds (2000ms)
        const duration = 2000; 
        const intervalTime = 30; // Update every 30ms
        const steps = duration / intervalTime; 
        const increment = goal / steps;

        const counter = setInterval(() => {
            count += increment;

            if (count >= goal) {
                count = goal;
                clearInterval(counter);
            }

            // Special Formatting for specific stats
            if (goal >= 1000000) {
                // For 1.6M -> Formats numbers like 0.1M, 0.5M... 1.6M
                el.innerText = (count / 1000000).toFixed(1) + "M+";
            } else if (goal === 6000) {
                // For 6000m² -> Formats with comma and unit
                el.innerText = Math.floor(count).toLocaleString() + "m²";
            } else {
                // For small numbers like 12
                el.innerText = Math.floor(count);
            }
        }, intervalTime);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(stat => startCount(stat));
            started = true;
        }
    });

    if (statsSection) statsObserver.observe(statsSection);

    // --- 3. GALLERY & LIGHTBOX ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create Lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `<span class="close-lightbox">&times;</span><div class="lightbox-wrapper"></div>`;
    document.body.appendChild(lightbox);
    
    const lightboxWrapper = lightbox.querySelector('.lightbox-wrapper');
    const closeBtn = lightbox.querySelector('.close-lightbox');

    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Open Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const hiddenVideo = item.querySelector('video source');
            const img = item.querySelector('img');
            lightboxWrapper.innerHTML = ''; 
            
            if (hiddenVideo) {
                const newVideo = document.createElement('video');
                newVideo.src = hiddenVideo.getAttribute('src');
                newVideo.controls = true;
                newVideo.autoplay = true;
                newVideo.className = 'lightbox-content';
                newVideo.style.maxWidth = "90vw";
                newVideo.style.maxHeight = "80vh";
                lightboxWrapper.appendChild(newVideo);
            } else if (img) {
                const newImg = document.createElement('img');
                newImg.src = img.src;
                newImg.className = 'lightbox-content';
                lightboxWrapper.appendChild(newImg);
            }
            lightbox.classList.add('active');
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightboxWrapper.innerHTML = '';
    };
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // --- 4. SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in, .modern-card, .gallery-item').forEach(el => observer.observe(el));
});