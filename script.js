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

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeLightbox = lightbox?.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const imagePath = item.getAttribute("data-full");
    const thumb = item.querySelector("img");

    if (!lightbox || !lightboxImage || !imagePath) return;

    lightboxImage.src = imagePath;
    lightboxImage.alt = thumb?.alt || "Expanded MorenoMix project image";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeProjectLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

closeLightbox?.addEventListener("click", closeProjectLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeProjectLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectLightbox();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const estimateForm = document.querySelector("#estimateForm");
estimateForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name")?.value.trim() || "";
  const phone = document.querySelector("#phone")?.value.trim() || "";
  const message = document.querySelector("#message")?.value.trim() || "";

  const subject = encodeURIComponent("MorenoMix Concrete Estimate Request");
  const body = encodeURIComponent(
`Hello MorenoMix,

I would like a concrete estimate.

Name: ${name}
Phone: ${phone}

Project Details:
${message}

Thank you.`
  );

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
