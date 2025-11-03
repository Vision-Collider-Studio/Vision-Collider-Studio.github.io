const portfolioData = [
  {
    id: 1,
    title: "Riziko",
    description:
      "Rogue-like card battler inspired by the classic Turkish game 'Okey'.",
    image: "images/riziko.gif",
    tech: ["Unity", "Card Game", "Play on Browser"],
    link: "https://kenanaegean.github.io/Riziko_WebGL/",
  },
  {
    id: 2,
    title: "Way Escape",
    description:
      "A 2D pixel-art platformer featuring challenging obstacles and adventure gameplay.",
    image: "images/waye.gif",
    tech: ["Unity", "Platformer", "Play on Browser"],
    link: "https://github.com/KenanAegean/WayEscape-2D-Unity-Game-Demo",
  },
  {
    id: 3,
    title: "Swarmbreaker",
    description:
      "Fast-paced bullet-hell survival game with swarming enemy waves.",
    image: "images/sboop2.gif",
    tech: ["Unity", "Bullet Hell", "Play on Browser"],
    link: "https://kenanege.itch.io/swarmbreaker",
  },
  {
    id: 4,
    title: "No Need For Speed",
    description:
      "Co-op multiplayer Formula-style racing game focused on teamwork, not speed.",
    image: "images/nnfs.gif",
    tech: ["Unity", "Racing", "Play on Browser"],
    link: "https://github.com/KenanAegean/No-Need-For-Speed",
  },
  {
    id: 5,
    title: "Snake",
    description:
      "Classic Snake game built in C++ and played in the terminal.",
    image: "images/sccp.gif",
    tech: ["C++", "Retro"],
    link: "https://github.com/KenanAegean/Snake-Game-Cpp",
  },
  {
    id: 6,
    title: "Pathfinder",
    description:
      "Visual demo showcasing A* pathfinding in a grid-based environment.",
    image: "images/pathFind.gif",
    tech: ["Unity", "Algorithm", "Test on Browser"],
    link: "https://github.com/KenanAegean/Ai-PathFinding-Project",
  },
  {
    id: 7,
    title: "CRT Shooter",
    description:
      "Retro-style shooter featuring a custom CRT TV shader effect.",
    image: "images/shader1.gif",
    tech: ["Unity", "Shader Programming", "Shooter"],
    link: "https://github.com/KenanAegean/FG-Shader",
  },
];

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header = document.getElementById("header");
  if (section) {
    const headerHeight = header.offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Initialize particles for philosophy section
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random horizontal position
    particle.style.left = Math.random() * 100 + "%";

    // Start particles at random vertical positions throughout the section
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay for natural movement
    particle.style.animationDelay = Math.random() * 20 + "s";

    // Random animation duration for variety
    particle.style.animationDuration = 18 + Math.random() * 8 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");

function createCarouselItem(data, index) {
  const item = document.createElement("div");
  item.className = "carousel-item";
  item.dataset.index = index;

  const techBadges = data.tech
    .map((tech) => `<span class="tech-badge">${tech}</span>`)
    .join("");

  const cardClass = data.link ? 'card clickable-card' : 'card';
  const cursorStyle = data.link ? 'cursor: pointer;' : '';

  item.innerHTML = `
                <div class="${cardClass}" style="${cursorStyle}" data-link="${data.link || ''}">
                    <div class="card-number">0${data.id}</div>
                    <div class="card-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
                    <div class="card-tech">${techBadges}</div>
                </div>
            `;

  if (data.link) {
    const card = item.querySelector('.card');
    card.addEventListener('click', function() {
      window.open(data.link, '_blank');
    });
  }

  return item;
}

function initCarousel() {
  // Create carousel items
  portfolioData.forEach((data, index) => {
    const item = createCarouselItem(data, index);
    carousel.appendChild(item);

    // Create indicator
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.dataset.index = index;
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  updateCarousel();
}

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
  const totalItems = items.length;
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  items.forEach((item, index) => {
    // Calculate relative position
    let offset = index - currentIndex;

    // Wrap around for continuous rotation
    if (offset > totalItems / 2) {
      offset -= totalItems;
    } else if (offset < -totalItems / 2) {
      offset += totalItems;
    }

    const absOffset = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    // Reset transform
    item.style.transform = "";
    item.style.opacity = "";
    item.style.zIndex = "";
    item.style.transition = "all 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)";

    // Adjust spacing based on screen size
    let spacing1 = 400;
    let spacing2 = 600;
    let spacing3 = 750;

    if (isMobile) {
      spacing1 = 280; // Was 400, now 100px closer
      spacing2 = 420; // Was 600, now 180px closer
      spacing3 = 550; // Was 750, now 200px closer
    } else if (isTablet) {
      spacing1 = 340;
      spacing2 = 520;
      spacing3 = 650;
    }

    if (absOffset === 0) {
      // Center item
      item.style.transform = "translate(-50%, -50%) translateZ(0) scale(1)";
      item.style.opacity = "1";
      item.style.zIndex = "10";
    } else if (absOffset === 1) {
      // Side items
      const translateX = sign * spacing1;
      const rotation = isMobile ? 25 : 30;
      const scale = isMobile ? 0.88 : 0.85;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.8";
      item.style.zIndex = "5";
    } else if (absOffset === 2) {
      // Further side items
      const translateX = sign * spacing2;
      const rotation = isMobile ? 35 : 40;
      const scale = isMobile ? 0.75 : 0.7;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.5";
      item.style.zIndex = "3";
    } else if (absOffset === 3) {
      // Even further items
      const translateX = sign * spacing3;
      const rotation = isMobile ? 40 : 45;
      const scale = isMobile ? 0.65 : 0.6;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.3";
      item.style.zIndex = "2";
    } else {
      // Hidden items (behind)
      item.style.transform =
        "translate(-50%, -50%) translateZ(-500px) scale(0.5)";
      item.style.opacity = "0";
      item.style.zIndex = "1";
    }
  });

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % portfolioData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex =
    (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
  resetTimer();
}

// Auto-rotate carousel with timer reset capability
let autoRotateInterval;

function startAutoRotate() {
  // Clear existing interval if any
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
  }
  // Start new interval
  autoRotateInterval = setInterval(nextSlide, 5000);
}

function resetTimer() {
  startAutoRotate();
}

// Event listeners with timer reset
document.getElementById("nextBtn").addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  prevSlide();
  resetTimer();
});

// Start auto-rotation
startAutoRotate();

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
    resetTimer();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
    resetTimer();
  }
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateCarousel();
  }, 250);
});

// Initialize on load
initCarousel();
initParticles();

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Update active navigation on scroll
function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href").substring(1);
        if (href === sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Animated counter for stats
function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((number) => {
        if (!number.classList.contains("animated")) {
          number.classList.add("animated");
          animateCounter(number);
        }
      });
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  observer.observe(statsSection);
}

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  }, 1500);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
