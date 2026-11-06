const games = {
  gta: {
    title: "Grand Theft Auto V",
    description: "Um jogo de ação e aventura em mundo aberto ambientado em Los Santos. A campanha acompanha três personagens e combina exploração, direção e missões. O modo online é uma experiência separada e depende de plataforma e serviços compatíveis.",
    facts: ["Ação e aventura", "Mundo aberto", "Classificação indicativa: 18+"],
    warning: "Conteúdo destinado a adultos. Respeite a classificação indicativa brasileira e as regras da plataforma.",
    url: "https://www.rockstargames.com/gta-v"
  },
  fc: {
    title: "EA SPORTS FC 27",
    description: "Título de futebol da franquia EA SPORTS FC. Jogos da série costumam oferecer partidas, gestão de equipes e modos online ou offline, conforme a edição. Confirme os recursos e a disponibilidade da edição 27 na página oficial.",
    facts: ["Esportes / futebol", "Modos variam por edição", "Consulte a classificação"],
    warning: "Nome, lançamento, plataformas e recursos podem mudar. Confira as informações oficiais antes de divulgar ou comprar.",
    url: "https://www.ea.com/games/ea-sports-fc"
  },
  ufc: {
    title: "EA SPORTS UFC",
    description: "Franquia de jogos de luta esportiva inspirada no MMA. O jogador escolhe atletas e disputa combates usando movimentos, defesa e estratégia. A edição disponível e seus recursos dependem da plataforma.",
    facts: ["Luta / esporte", "Combates de MMA", "Consulte a classificação"],
    warning: "Verifique a classificação indicativa e a edição disponível na loja oficial.",
    url: "https://www.ea.com/games/ufc"
  }
};

const modal = document.getElementById("gameModal");
const title = document.getElementById("modalTitle");
const description = document.getElementById("modalDescription");
const facts = document.getElementById("modalFacts");
const warning = document.getElementById("modalWarning");
const storeLink = document.getElementById("storeLink");

document.querySelectorAll(".details-button").forEach(button => {
  button.addEventListener("click", () => {
    const game = games[button.dataset.game];
    if (!game) return;
    title.textContent = game.title;
    description.textContent = game.description;
    warning.textContent = game.warning;
    facts.replaceChildren(...game.facts.map(item => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    storeLink.href = game.url;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("modalClose").focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

document.querySelectorAll(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll(".game-card").forEach(card => {
      const show = filter === "todos" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    document.getElementById("catalogCount").textContent = `${String(visible).padStart(2,"0")} JOGOS`;
  });
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
