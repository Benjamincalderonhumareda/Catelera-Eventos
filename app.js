
const app = document.getElementById("app");
let events = [];

async function loadEvents() {
  try {
const res = await fetch("./data/eventodb.json");
    events = await res.json();
  } catch (err) {
    console.error("Error al cargar eventodb.json", err);
  }
}

function renderHome() {
  app.innerHTML = `
    <section class="home">
      <h1>Bienvenido a la Cartelera de Eventos</h1>
      <p>Explora conciertos, obras, festivales y más en un solo lugar.</p>
      <button class="btn" onclick="location.hash='#/catalog'">Ver eventos</button>
    </section>
  `;
}

function router() {
  const hash = location.hash || "#/home";

  document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));

  if (hash === "#/home") document.getElementById("nav-home").classList.add("active");
  if (hash === "#/catalog") document.getElementById("nav-events").classList.add("active");
  if (hash === "#/favorites") document.getElementById("nav-fav").classList.add("active");
  if (hash === "#/cart") document.getElementById("nav-cart").classList.add("active");
  if (hash === "#/contact") document.getElementById("nav-contact").classList.add("active");

  if (hash === "#/home") renderHome();
  else if (hash === "#/catalog") renderCatalog();
  else if (hash.startsWith("#/event/")) {
    const id = hash.split("/")[2];
    viewDetail(id);
  } else if (hash === "#/favorites") renderFavorites();
  else if (hash === "#/cart") renderCart();
  else if (hash === "#/contact") renderContact();
  else renderHome();
}

window.addEventListener("hashchange", router);
loadEvents().then(() => router());
