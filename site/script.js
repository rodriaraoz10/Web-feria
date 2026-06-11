const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const galleryCards = [...document.querySelectorAll(".gallery-card")];

const closeMenu = () => {
  if (!menuToggle || !nav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const normalizePath = (value) => {
  const path = value.split("/").pop() || "index.html";
  return path === "" ? "index.html" : path;
};

const setActiveNavLink = () => {
  const currentPath = normalizePath(window.location.pathname);

  navLinks.forEach((link) => {
    const targetPath = normalizePath(link.getAttribute("href") || "");
    const isActive = targetPath === currentPath;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateParallax = () => {
  if (mediaQuery.matches) {
    return;
  }

  const viewportHeight = window.innerHeight;

  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const distance = (rect.top + rect.height / 2 - viewportHeight / 2) * -0.03;
    item.style.transform = `translate3d(0, ${distance}px, 0)`;
  });
};

let ticking = false;

const requestParallaxFrame = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter ?? "all";

    filterButtons.forEach((chip) => {
      chip.classList.toggle("is-active", chip === button);
    });

    galleryCards.forEach((card) => {
      const categories = card.dataset.category?.split(" ") ?? [];
      const matches = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 18);
  requestParallaxFrame();
});

window.addEventListener("load", () => {
  setActiveNavLink();
  header?.classList.toggle("scrolled", window.scrollY > 18);
  updateParallax();
});

window.addEventListener("resize", requestParallaxFrame);
