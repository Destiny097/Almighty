<script>
    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('[data-carousel-slide]');
        const prevButton = document.querySelector('[data-carousel-prev]');
        const nextButton = document.querySelector('[data-carousel-next]');
        let currentIndex = 0;
        let autoSlideInterval;

        function showSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(slide => {
                slide.classList.remove('opacity-100');
                slide.classList.add('opacity-0');
            });

            slides[index].classList.remove('opacity-0');
            slides[index].classList.add('opacity-100');
            currentIndex = index;
            resetAutoSlide();
        }

        function nextSlide() { showSlide(currentIndex + 1); }
        function prevSlide() { showSlide(currentIndex - 1); }
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        showSlide(0);
    });
</script>
<script>
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileNavItems = document.getElementById('mobile-nav-items');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileNavItems.classList.toggle('active');
        });
</script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
      // Select the button
      const topButton = document.querySelector('.back-to-top');
      
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          topButton.classList.remove('hidden');
        } else {
          topButton.classList.add('hidden');
        }
      });
      
      // Scroll to top when clicked
      topButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
    </script>
    <script>
        const carousel = document.getElementById("clientCarousel");
        const prevBtn = document.getElementById("carousel-prev");
        const nextBtn = document.getElementById("carousel-next");
      
        const slideWidth = 280; // Width of one logo item
        const totalSlides = carousel.children.length-2 ;
      
        let position = 0;
      
        function moveCarousel(dir) {
          position += dir * slideWidth;
      
          // Loop back to start or end
          if (position < 0) {
            position = slideWidth * (totalSlides - 1);
          } else if (position >= slideWidth * totalSlides) {
            position = 0;
          }
      
          carousel.style.transform = `translateX(-${position}px)`;
        }
      
        prevBtn.addEventListener("click", () => moveCarousel(-1));
        nextBtn.addEventListener("click", () => moveCarousel(1));
      
        // Auto-play every 2 seconds
        setInterval(() => moveCarousel(1), 2000);
      </script>        
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const track = document.getElementById('testimonialTrack');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const dots = document.querySelectorAll('.testimonial-dot');
        const slides = document.querySelectorAll('#testimonialTrack > div');
        let currentIndex = 0;
    
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('bg-white', index === currentIndex);
                dot.classList.toggle('bg-gray-400', index !== currentIndex);
            });
            
            // Disable buttons at boundaries
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === slides.length - 1;
        }
    
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateCarousel();
            });
        });
    
        // Auto-rotate (optional)
        let interval = setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    
        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(interval));
        track.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            }, 5000);
        });
    
        // Initialize
        updateCarousel();
    });
    </script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    
    <script>
        AOS.init({once:true});
    </script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.carousel-slide');
        const slideCount = slides.length;
        let currentIndex = 0;
        let nextIndex = 1;
        const slideDuration = 5000;
        const transitionDuration = 1000;
        let interval;
        
        function slideToNext() {
            slides[currentIndex].style.transform = 'translateX(-100%)';
            slides[nextIndex].style.transform = 'translateX(0)';
            
            currentIndex = nextIndex;
            nextIndex = (nextIndex + 1) % slideCount;
            
            setTimeout(() => {
                slides.forEach((slide, index) => {
                    if(index !== currentIndex) {
                        slide.style.transform = 'translateX(100%)';
                    }
                });
            }, transitionDuration);
        }
        
        function goToSlide(index) {
            if (index === currentIndex) return;
            
            clearInterval(interval);
            
            if (index > currentIndex) {
                slides[currentIndex].style.transform = 'translateX(-100%)';
                slides[index].style.transform = 'translateX(0)';
            } else {
                slides[currentIndex].style.transform = 'translateX(100%)';
                slides[index].style.transform = 'translateX(0)';
            }
            
            nextIndex = (index + 1) % slideCount;
            currentIndex = index;
            
            setTimeout(() => {
                slides.forEach((slide, i) => {
                    if(i !== currentIndex) {
                        slide.style.transform = 'translateX(100%)';
                    }
                });
            }, transitionDuration);
            
            startCarousel();
        }
        
        // Initialize
        slides.forEach((slide, index) => {
            if(index > 0) {
                slide.style.transform = 'translateX(100%)';
            }
        });
        
        function startCarousel() {
            interval = setInterval(slideToNext, slideDuration);
        }
        startCarousel();
        
        // Pause on hover
        const carousel = document.querySelector('.carousel-container');
        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', startCarousel);
        
        // Button controls
        document.querySelector('.carousel-prev').addEventListener('click', () => {
            goToSlide((currentIndex - 1 + slideCount) % slideCount);
        });
        
        document.querySelector('.carousel-next').addEventListener('click', () => {
            goToSlide((currentIndex + 1) % slideCount);
        });
    });
  </script>
<script>
const counts = document.querySelectorAll('.count');
const speed = 50;

const startCounter = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 30);
        } else {
            counter.innerText = target +"+" ;
        }
    };

    updateCount();
};

// Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            startCounter(counter);
            observer.unobserve(counter); // Optional: Stop observing after trigger
        }
    });
}, {
    threshold: 0.7 
});

// Observe each counter
counts.forEach(counter => {
    observer.observe(counter);
});


</script>