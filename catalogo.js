
function renderCatalog() {
  let html = `
    <h2>Eventos disponibles</h2>
    <div class="grid">
  `;

  events.forEach((ev) => {
    const date = new Date(ev.datetime).toLocaleString("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    html += `
      <div class="card">
        <img src="${ev.images?.[0] || "mapa.png"}" alt="${ev.title}">
        <h3>${ev.title}</h3>
        <p><strong>Categoría:</strong> ${ev.category}</p>
        <p><strong>Ciudad:</strong> ${ev.city}</p>
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Precio desde:</strong> ${ev.priceFrom === 0 ? "Gratis" : ev.currency + " " + ev.priceFrom}</p>
        ${ev.soldOut ? `<p style="color:red;"><strong>Agotado</strong></p>` : ""}
        <button class="btn" onclick="viewDetail('${ev.id}')">Ver detalle</button>
      </div>
    `;
  });

  html += `</div>`;
  app.innerHTML = html;
}

function renderDetail(ev) {
  const date = new Date(ev.datetime).toLocaleString("es-PE", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const shareURL = `${window.location.origin}${window.location.pathname}#/event/${ev.id}`;

 
const city = ev.city.toLowerCase();
let mapURL = `mapa-${city}.jpg`;

if (![].includes(city)) {
  mapURL = "mapa.png";
}
  app.innerHTML = `
    <section class="detail">
      <img src="${ev.images?.[0] || "./assets/default.jpg"}" alt="${ev.title}">
      <h2>${ev.title}</h2>
      ${ev.soldOut ? `<p style="color:red;"><strong>AGOTADO</strong></p>` : ""}
      <p><strong>Categoría:</strong> ${ev.category}</p>
      <p><strong>Artistas:</strong> ${ev.artists?.join(", ") || "No especificado"}</p>
      <p><strong>Ciudad:</strong> ${ev.city}</p>
      <p><strong>Lugar:</strong> ${ev.venue}</p>
      <p><strong>Fecha y hora:</strong> ${date}</p>
      <p><strong>Precio desde:</strong> ${ev.priceFrom === 0 ? "Gratis" : ev.currency + " " + ev.priceFrom}</p>
      <p><strong>Popularidad:</strong> ${ev.popularity}/100</p>
      <p><strong>Stock disponible:</strong> ${ev.stock}</p>

      <h3>Políticas</h3>
      <p><strong>Edad mínima:</strong> ${ev.policies?.age || "Todas las edades"}</p>
      <p><strong>Reembolso:</strong> ${ev.policies?.refund || "No reembolsable"}</p>

      <h3>Ubicación</h3>
      <img src="${mapURL}" alt="Mapa del evento" class="mapa-img">

      <h3>Descripción</h3>
      <p>${ev.description}</p>

      <div style="margin-top:12px;">
        <button class="btn" onclick="addToFavorites('${ev.id}')">❤ Favorito</button>
        <button class="btn" onclick="addToCart('${ev.id}')"> Agregar al carrito</button>
        <button class="btn" onclick="copyShareLink('${shareURL}')"> Compartir enlace</button>
<button class="btn" onclick="renderCatalog()">Volver</button>
      </div>
    </section>
  `;
}

function viewDetail(id) {
  const ev = events.find((e) => e.id === id);
  if (ev) renderDetail(ev);
}

function copyShareLink(url) {
  navigator.clipboard.writeText(url);
  alert("Enlace copiado al portapapeles ");
}
