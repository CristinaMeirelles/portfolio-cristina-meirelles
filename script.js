const botaoMenu = document.querySelector(".botao-menu");
const menuNavegacao = document.querySelector(".menu-navegacao");
const botaoVoltarTopo = document.querySelector(".voltar-topo");
const formularioContato = document.querySelector("#formularioContato");

function fecharMenu() {
  if (!botaoMenu || !menuNavegacao) return;

  botaoMenu.setAttribute("aria-expanded", "false");
  menuNavegacao.classList.remove("aberto");
  document.body.classList.remove("menu-aberto");
}

botaoMenu?.addEventListener("click", () => {
  const estaAberto = botaoMenu.getAttribute("aria-expanded") === "true";

  botaoMenu.setAttribute("aria-expanded", String(!estaAberto));
  menuNavegacao?.classList.toggle("aberto");
  document.body.classList.toggle("menu-aberto");
});

document.querySelectorAll(".menu-navegacao a").forEach((link) => {
  link.addEventListener("click", fecharMenu);
});

window.addEventListener("scroll", () => {
  botaoVoltarTopo?.classList.toggle("visivel", window.scrollY > 500);
});

botaoVoltarTopo?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

formularioContato?.addEventListener("submit", (event) => {
  event.preventDefault();

  const dadosFormulario = new FormData(formularioContato);
  const nome = String(dadosFormulario.get("nome") || "").trim();
  const mensagem = String(dadosFormulario.get("mensagem") || "").trim();
  const telefone = "5521969282873";
  const texto = `Olá, Cristina. Meu nome é ${nome}. ${mensagem}`;
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank", "noopener,noreferrer");
  formularioContato.reset();
});

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".revelar").forEach((elemento) => {
  observador.observe(elemento);
});
