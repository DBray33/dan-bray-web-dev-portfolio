// NAVBAR MENU
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-items');
  const menuLinks = document.querySelectorAll('.mobile-menu-items a'); // Select all menu links

  // Toggle mobile menu and icon rotation
  toggleButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent event from bubbling to the document
    mobileMenu.classList.toggle('active');
    toggleButton.classList.toggle('menu-active'); // Add a class to indicate active state
  });

  // Close mobile menu when clicking anywhere else
  document.addEventListener('click', function () {
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      toggleButton.classList.remove('menu-active'); // Reset icon state
    }
  });

  // Close the menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      toggleButton.classList.remove('menu-active'); // Reset icon state
    });
  });

  // Close the menu when clicking anywhere on the mobile menu background
  mobileMenu.addEventListener('click', function () {
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      toggleButton.classList.remove('menu-active'); // Reset icon state
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

// HERO CAROUSEL FUNCTIONALITY
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

// HERO Carousel Parallax
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
// LOGO LINK //////////////////
// Logo spin animation:
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
// Logo shrink on scroll
window.addEventListener('scroll', function () {
  const logo = document.querySelector('.logo-link');
  if (window.scrollY > 50) {
    // Adjust threshold as needed
    logo.classList.add('logo-link-small');
  } else {
    logo.classList.remove('logo-link-small');
  }
});

// Animation for About Intro section
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll(
    '.animate-from-left, .animate-from-right'
  );

  function handleScroll() {
    animatedElements.forEach((element) => {
      const position = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is in view
      if (position.top < windowHeight * 0.8 && position.bottom > 0) {
        element.classList.add('animate-visible');
      } else {
        element.classList.remove('animate-visible');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check in case elements are already in view
});

// ICONS
// About-icon slide in animation
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
// Icon Content hide/display
function showContent(contentId) {
  // Hide all content sections
  document.querySelectorAll('.content-section').forEach((section) => {
    section.classList.remove('active');
  });

  // Remove active class from all icons
  document.querySelectorAll('.icon-item').forEach((item) => {
    item.classList.remove('active');
  });

  // Show the selected content section
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Add active class to the corresponding icon-item
  const activeIcon = document.querySelector(
    `.icon-item[onclick="showContent('${contentId}')"]`
  );
  if (activeIcon) {
    activeIcon.classList.add('active');
  }

  // Close active content and icon when clicking outside
  document.addEventListener('click', function handleClickOutside(event) {
    // Check if the click happened outside the active content or icon
    if (
      !selectedContent.contains(event.target) &&
      !activeIcon.contains(event.target)
    ) {
      selectedContent.classList.remove('active');
      activeIcon.classList.remove('active');
      document.removeEventListener('click', handleClickOutside); // Remove listener to avoid duplicates
    }
  });
}

// ///////////////////////////////
// ///////////////////////////////
// ///////////////////////////////
// ///////////////////////////////
// PROJECTS SECTION

// Projects Navigation
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.projects-nav-item');
  const projectItems = document.querySelectorAll('.project-item');

  navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
      // Remove active class from all nav items
      navItems.forEach((item) => item.classList.remove('active'));
      // Add active class to clicked nav item
      navItem.classList.add('active');

      // Get filter category
      const filter = navItem.getAttribute('data-filter');

      // Show/Hide projects based on filter
      projectItems.forEach((project) => {
        if (filter === 'all' || project.classList.contains(filter)) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
});
// DROP DOWN TEXT BOX FOR ICONS ///////////////////
// DROP DOWN TEXT BOX FOR ICONS ///////////////////
// function toggleTextBox(event, boxId) {
//   event.stopPropagation();
//   const textBox = document.getElementById(boxId);
//   const isVisible = textBox.style.display === 'block';

//   document.querySelectorAll('.text-box').forEach((box) => {
//     box.style.display = 'none';
//     box.style.left = '50%';
//     box.style.right = 'auto';
//     box.style.transform = 'translateX(-50%)';
//   });

//   if (!isVisible) {
//     textBox.style.display = 'block';

//     const rect = textBox.getBoundingClientRect();
//     const margin = 10;

//     if (rect.left < margin) {
//       textBox.style.left = `${margin}px`;
//       textBox.style.transform = 'none';
//     } else if (rect.right > window.innerWidth - margin) {
//       textBox.style.left = 'auto';
//       textBox.style.right = `${margin}px`;
//       textBox.style.transform = 'none';
//     } else {
//       textBox.style.left = '50%';
//       textBox.style.transform = 'translateX(-50%)';
//     }
//   } else {
//     textBox.style.display = 'none';
//   }
// }

// document.addEventListener('click', function () {
//   document.querySelectorAll('.text-box').forEach((box) => {
//     box.style.display = 'none';
//     box.style.left = '50%';
//     box.style.right = 'auto';
//     box.style.transform = 'translateX(-50%)';
//   });
// });
// /////////////////////////////////////////////
