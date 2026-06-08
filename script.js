const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector("#contactForm");

function closeMenu() {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";

  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu?.classList.toggle("is-open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("is-visible", window.scrollY > 500);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nome = String(formData.get("nome") || "").trim();
  const mensagem = String(formData.get("mensagem") || "").trim();
  const telefone = "5521969282873";
  const texto = `Olá, Cristina. Meu nome é ${nome}. ${mensagem}`;
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank", "noopener,noreferrer");
  contactForm.reset();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});
