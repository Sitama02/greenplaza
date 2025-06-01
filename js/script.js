// JavaScript for GP Sports Complex Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animate stats numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const animateStats = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateStat = () => {
          current += step;
          if (current < target) {
            if (target > 1000) {
              stat.textContent = Math.round(current / 1000 * 10) / 10 + 'M';
            } else {
              stat.textContent = Math.round(current).toLocaleString();
            }
            requestAnimationFrame(updateStat);
          } else {
            if (target > 1000) {
              stat.textContent = (target / 1000).toFixed(1) + 'M';
            } else {
              stat.textContent = target.toLocaleString();
            }
          }
        };
        
        updateStat();
      });
    };
    
    // Check if element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    
    // Animate stats when they come into view
    const handleScroll = () => {
      if (isInViewport(statNumbers[0])) {
        animateStats();
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
  }
  
  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    // Add more testimonials dynamically
    const testimonials = [
      {
        content: "GPSC has transformed my training routine. The facilities are world-class and the coaches are incredibly supportive. I've improved more in 6 months here than in years elsewhere.",
        author: "Mohamed Ahmed",
        position: "Tennis Academy Member",
        image: "images/momo.jpg"
      },
      {
        content: "As a parent, I'm impressed by the quality of coaching and the safe environment GPSC provides. My children have developed not just athletic skills but also confidence and discipline.",
        author: "Laila Ibrahim",
        position: "Parent of Junior Members",
        image: "images/momo.jpg"
      },
      {
        content: "The community at GPSC is what sets it apart. I've made great friends while improving my fitness. The staff go above and beyond to make everyone feel welcome.",
        author: "Ahmed Karim",
        position: "Monthly Member",
        image: "images/momo.jpg"
      }
    ];
    
    // Create testimonial cards
    testimonials.forEach((testimonial, index) => {
      if (index === 0) return; // Skip first one as it's already in HTML
      
      const testimonialCard = document.createElement('div');
      testimonialCard.className = 'testimonial-card';
      testimonialCard.innerHTML = `
        <div class="testimonial-content">
          <p>"${testimonial.content}"</p>
        </div>
        <div class="testimonial-author">
          <img src="${testimonial.image}" alt="${testimonial.author}">
          <div class="author-info">
            <h4>${testimonial.author}</h4>
            <p>${testimonial.position}</p>
          </div>
        </div>
      `;
      
      testimonialSlider.appendChild(testimonialCard);
    });
    
    // Simple slider functionality
    let currentSlide = 0;
    const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
    
    // Hide all slides except the first one
    testimonialCards.forEach((card, index) => {
      if (index !== 0) {
        card.style.display = 'none';
      }
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
      testimonialCards[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % testimonialCards.length;
      testimonialCards[currentSlide].style.display = 'block';
    }, 5000);
  }
  
  // Program tabs functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // Gallery filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Show/hide gallery items based on filter
        galleryItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Lightbox functionality for gallery
  const galleryOverlays = document.querySelectorAll('.gallery-overlay');
  
  if (galleryOverlays.length > 0) {
    galleryOverlays.forEach(overlay => {
      overlay.addEventListener('click', function() {
        const imgSrc = this.parentElement.querySelector('img').src;
        const imgAlt = this.parentElement.querySelector('img').alt;
        const imgTitle = this.querySelector('h3')?.textContent || imgAlt;
        const imgDesc = this.querySelector('p')?.textContent || '';
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imgSrc}" alt="${imgAlt}">
            <div class="lightbox-caption">
              <h3>${imgTitle}</h3>
              <p>${imgDesc}</p>
            </div>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox on click
        lightbox.addEventListener('click', function(e) {
          if (e.target === this || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(this);
            document.body.style.overflow = '';
          }
        });
      });
    });
  }
  
  // Academy accordion functionality
  const academyHeaders = document.querySelectorAll('.academy-header');
  
  if (academyHeaders.length > 0) {
    academyHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const content = document.getElementById(this.getAttribute('data-toggle'));
        const icon = this.querySelector('.toggle-icon i');
        
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          icon.className = 'fas fa-plus';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.className = 'fas fa-minus';
        }
      });
    });
  }
  
  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-toggle i');
        
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
          icon.className = 'fas fa-plus';
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.className = 'fas fa-minus';
        }
      });
    });
  }
  
  // Form validation
  const forms = document.querySelectorAll('form');
  
  if (forms.length > 0) {
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });
        
        if (isValid) {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'form-success';
          successMessage.textContent = 'Thank you! Your submission has been received.';
          
          form.reset();
          form.appendChild(successMessage);
          
          // Remove success message after 3 seconds
          setTimeout(() => {
            form.removeChild(successMessage);
          }, 3000);
        }
      });
    });
  }
  
  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const slideElements = document.querySelectorAll('.slide-up');
  
  const animateOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.style.opacity = '1';
      }
    });
    
    slideElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Check on initial load
  
  // Scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
