const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.full || button.querySelector("img")?.src;
    const alt = button.querySelector("img")?.alt || "MorenoMix project photo";

    if (!src || !lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
