document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gallery Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

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

    // --- 2. Lightbox Logic ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `<span class="close-lightbox">&times;</span><div class="lightbox-wrapper"></div>`;
    document.body.appendChild(lightbox);

    const lightboxWrapper = lightbox.querySelector('.lightbox-wrapper');
    const closeBtn = lightbox.querySelector('.close-lightbox');

    // Add Click to Gallery Items ONLY
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const hiddenVideo = item.querySelector('video source');
            const img = item.querySelector('img');

            lightboxWrapper.innerHTML = ''; // Clear content

            if (hiddenVideo) {
                // Play Video in Lightbox
                const newVideo = document.createElement('video');
                newVideo.src = hiddenVideo.getAttribute('src');
                newVideo.controls = true;
                newVideo.autoplay = true;
                newVideo.className = 'lightbox-content';
                newVideo.style.maxWidth = "90vw";
                newVideo.style.maxHeight = "80vh";
                lightboxWrapper.appendChild(newVideo);
            } else if (img) {
                // Show Image in Lightbox
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

    // --- 3. Scroll Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in, .modern-card, .gallery-item').forEach(el => observer.observe(el));
});