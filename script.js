const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// Desktop/laptop header auto-hide on scroll.
// Mobile menu behavior is intentionally unchanged.
const siteHeader = document.querySelector(".site-header");
let lastScrollY = window.scrollY;
let tickingHeader = false;

function updateDesktopHeader() {
  if (!siteHeader) return;

  const isDesktop = window.matchMedia("(min-width: 981px)").matches;
  const currentScrollY = window.scrollY;

  if (!isDesktop) {
    siteHeader.classList.remove("is-hidden", "is-scrolled");
    lastScrollY = currentScrollY;
    tickingHeader = false;
    return;
  }

  siteHeader.classList.toggle("is-scrolled", currentScrollY > 8);

  if (currentScrollY <= 80) {
    siteHeader.classList.remove("is-hidden");
  } else if (currentScrollY > lastScrollY + 6) {
    siteHeader.classList.add("is-hidden");
  } else if (currentScrollY < lastScrollY - 6) {
    siteHeader.classList.remove("is-hidden");
  }

  lastScrollY = currentScrollY;
  tickingHeader = false;
}

window.addEventListener("scroll", () => {
  if (!tickingHeader) {
    window.requestAnimationFrame(updateDesktopHeader);
    tickingHeader = true;
  }
}, { passive: true });

window.addEventListener("resize", updateDesktopHeader);
updateDesktopHeader();


// Fast rotating image for the feature section.
// Starts at image (02).jpg to avoid the less appealing pre-work image (01).
const featureSlideshowImage = document.querySelector(".feature-slideshow-image");
const featureSlideshowImages = [
  "images/image (02).jpg",
  "images/image (03).jpg",
  "images/image (04).jpg",
  "images/image (05).jpg",
  "images/image (06).jpg",
  "images/image (07).jpg",
  "images/image (08).jpg",
  "images/image (09).jpg",
  "images/image (10).jpg",
  "images/image (11).jpg",
  "images/image (12).jpg",
  "images/image (13).jpg",
  "images/image (14).jpg",
  "images/image (15).jpg",
  "images/image (16).jpg",
  "images/image (17).jpg",
  "images/image (18).jpg",
  "images/image (19).jpg",
  "images/image (20).jpg",
  "images/image (21).jpg",
  "images/image 22.jpg",
  "images/image (23).jpg",
  "images/image (24).jpg"
];

if (featureSlideshowImage && featureSlideshowImages.length) {
  featureSlideshowImages.forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  let featureImageIndex = 0;

  window.setInterval(() => {
    featureImageIndex = (featureImageIndex + 1) % featureSlideshowImages.length;
    featureSlideshowImage.classList.add("is-changing");

    window.setTimeout(() => {
      featureSlideshowImage.src = featureSlideshowImages[featureImageIndex];
      featureSlideshowImage.alt = `MorenoMix concrete project photo ${featureImageIndex + 2}`;
      featureSlideshowImage.classList.remove("is-changing");
    }, 120);
  }, 1500);
}


const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeLightbox = lightbox?.querySelector(".lightbox-close");
const lightboxPrev = lightbox?.querySelector(".lightbox-prev");
const lightboxNext = lightbox?.querySelector(".lightbox-next");
const lightboxCount = lightbox?.querySelector(".lightbox-count");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const mobileGalleryLaunch = document.querySelector(".mobile-gallery-launch");
let activeGalleryIndex = 0;

function showProjectImage(index) {
  if (!lightbox || !lightboxImage || !galleryItems.length) return;

  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  const imagePath = item.getAttribute("data-full");
  const thumb = item.querySelector("img");

  if (!imagePath) return;

  lightboxImage.src = imagePath;
  lightboxImage.alt = thumb?.alt || "Expanded MorenoMix project image";
  if (lightboxCount) {
    lightboxCount.textContent = `${activeGalleryIndex + 1} of ${galleryItems.length}`;
  }
}

function openProjectLightbox(index = 0) {
  if (!lightbox || !lightboxImage || !galleryItems.length) return;

  showProjectImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openProjectLightbox(index));
});

mobileGalleryLaunch?.addEventListener("click", () => openProjectLightbox(0));

function closeProjectLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function showNextProjectImage() {
  showProjectImage(activeGalleryIndex + 1);
}

function showPreviousProjectImage() {
  showProjectImage(activeGalleryIndex - 1);
}

closeLightbox?.addEventListener("click", closeProjectLightbox);
lightboxNext?.addEventListener("click", showNextProjectImage);
lightboxPrev?.addEventListener("click", showPreviousProjectImage);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeProjectLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;

  if (event.key === "Escape") closeProjectLightbox();
  if (event.key === "ArrowRight") showNextProjectImage();
  if (event.key === "ArrowLeft") showPreviousProjectImage();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

