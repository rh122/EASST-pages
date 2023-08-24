const slides = document.querySelectorAll('.intro-slide');
let currentSlide = 0;

function showSlide(slideIndex) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Call nextSlide function to start the slideshow
nextSlide();
setInterval(nextSlide, 5000); // Change slide every 5 seconds
