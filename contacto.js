
function renderFavorites() {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favs.length === 0) {
    app.innerHTML = `<p>No tienes eventos favoritos aún.</p>`;
    return;
  }

  const favEvents = events.filter((ev) => favs.includes(ev.id));
  app.innerHTML = `
    <h2>Mis Favoritos</h2>
    <div class="grid">
      ${favEvents
        .map(
          (ev) => `
        <div class="card">
          <img src="${ev.images?.[0] || "./assets/default.jpg"}" alt="${ev.title}">
          <h3>${ev.title}</h3>
          <p>${ev.city} - ${ev.category}</p>
          <button class="btn" onclick="viewDetail('${ev.id}')">Ver detalle</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    app.innerHTML = `<p>Tu carrito está vacío.</p>`;
    return;
  }

  const cartEvents = events.filter((ev) => cart.includes(ev.id));
  let total = 0;

  app.innerHTML = `
    <h2>Carrito</h2>
    <div class="grid">
      ${cartEvents
        .map((ev) => {
          total += ev.priceFrom;
          return `
            <div class="card">
              <img src="${ev.images?.[0] || "./assets/default.jpg"}">
              <h3>${ev.title}</h3>
              <p>${ev.currency} ${ev.priceFrom}</p>
              <button class="btn" onclick="removeFromCart('${ev.id}')">Eliminar</button>
            </div>
          `;
        })
        .join("")}
    </div>
    <div style="margin-top:15px;">
      <p><strong>Total estimado:</strong> ${total.toFixed(2)}</p>
      <button class="btn" onclick="checkout()">Finalizar compra</button>
    </div>
  `;
}

function renderContact() {
  app.innerHTML = `
    <h2>Contacto</h2>
    <form class="card">
      <label>Nombre: <input type="text" required></label>
      <label>Email: <input type="email" required></label>
      <label>Mensaje: <textarea required></textarea></label>
      <button class="btn">Enviar</button>
    </form>
  `;
}

function addToFavorites(id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Agregado a favoritos!");
  } else {
    alert("Ya está en favoritos");
  }
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Agregado al carrito!");
  } else {
    alert("Ya está en el carrito");
  }
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((x) => x !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  localStorage.setItem("cart", JSON.stringify([]));
  alert("Compra simulada completada ");
  location.hash = "#/home";
}

