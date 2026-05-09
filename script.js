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
