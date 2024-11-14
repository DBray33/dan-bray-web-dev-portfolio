// NAVBAR MENU
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-items');
  const menuLinks = document.querySelectorAll('.mobile-menu-list a');

  // Toggle mobile menu on hamburger icon click
  toggleButton.addEventListener('click', function (event) {
    event.stopPropagation();
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
    });
  });

  // Close the mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      mobileMenu.classList.remove('active');
    }
  });
});

// Scroll effect on navbar
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const mobileMenu = document.querySelector('.mobile-menu-items');

  if (navbar && mobileMenu) {
    // Only apply the scroll effect if the mobile menu is not active
    if (navbar && !mobileMenu.classList.contains('active')) {
      if (window.scrollY > 0) {
        navbar.classList.add('navbar-scroll');
      } else {
        navbar.classList.remove('navbar-scroll');
      }
    }
  }
});

// BACK TO TOP BUTTON
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
  backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// Show the "Back to Top" button after scrolling down
window.addEventListener('scroll', function () {
  if (backToTopButton) {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }
});

// PARALLAX EFFECT IN HERO SECTION
window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;

  // Adjust the position of each layer at different speeds
  document.querySelector('.layer1').style.transform = `translateY(${
    scrollPosition * 0.2
  }px)`;
  document.querySelector('.layer2').style.transform = `translateY(${
    scrollPosition * 0.4
  }px)`;
  document.querySelector('.layer3').style.transform = `translateY(${
    scrollPosition * 0.6
  }px)`;
  document.querySelector('.layer4').style.transform = `translateY(${
    scrollPosition * 0.8
  }px)`;
  document.querySelector('.layer5').style.transform = `translateY(${
    scrollPosition * 1
  }px)`;
  document.querySelector('.layer6').style.transform = `translateY(${
    scrollPosition * 1.2
  }px)`;
  document.querySelector('.layer7').style.transform = `translateY(${
    scrollPosition * 1.4
  }px)`;
});

// CAROUSEL FUNCTIONALITY
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselButtons = document.querySelectorAll('.carousel-btn');
let currentIndex = 0;

function showCarouselItem(index) {
  carouselItems[currentIndex].classList.add('slide-out');
  carouselItems[currentIndex].classList.remove('active');

  carouselItems[currentIndex].addEventListener(
    'animationend',
    function () {
      this.classList.remove('slide-out');
    },
    { once: true }
  );

  currentIndex = index;
  carouselItems[currentIndex].classList.add('active');

  carouselButtons.forEach((btn) => btn.classList.remove('active'));
  carouselButtons[currentIndex].classList.add('active');
}

setInterval(() => {
  const nextIndex = (currentIndex + 1) % carouselItems.length;
  showCarouselItem(nextIndex);
}, 5000);

carouselButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => showCarouselItem(index));
});

// Carousel Parallax
document.addEventListener('DOMContentLoaded', function () {
  const carouselContent = document.querySelector('.carousel-content');

  if (carouselContent) {
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      const parallaxOffset = scrollPosition * 0.5; // Adjust factor for effect speed

      // Apply translateY to move it down based on scroll
      carouselContent.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px))`;
    });
  }
});

// TOP LEFT LOGO SPIN ANIMATION
const logoLink = document.querySelector('.logo-link');
if (logoLink) {
  logoLink.addEventListener('click', function (event) {
    event.preventDefault();
    logoLink.classList.add('spin');

    setTimeout(function () {
      window.location.href = logoLink.href;
    }, 500);
  });
}

// /////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const iconItems = document.querySelectorAll('.icon-item');
  const section = document.querySelector('.about-icons-section');

  function handleScroll() {
    const sectionPosition = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2; // Adjust as needed for when to trigger

    if (sectionPosition < screenPosition) {
      iconItems.forEach((item, index) => {
        item.style.setProperty('--icon-index', index); // Set custom delay for each icon
        item.classList.add('animate'); // Add animate class when section is in view
      });
      window.removeEventListener('scroll', handleScroll); // Remove scroll listener once triggered
    }
  }

  window.addEventListener('scroll', handleScroll);
});
