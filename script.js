// ÉTOILES
const stars = document.getElementById("stars");
for (let i = 0; i < 40; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.animationDuration = (5 + Math.random() * 5) + "s";
    stars.appendChild(star);
}

// PANIER
let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    cart.forEach(item => {
        cartDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price} FCFA</span>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

// WHATSAPP
function sendWhatsApp() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;

    if (!name || !phone || cart.length === 0) {
        alert("Veuillez remplir les informations et ajouter un produit.");
        return;
    }

    let message =
        `Nouvelle commande\n` +
        `Nom: ${name}\n` +
        `Téléphone: ${phone}\n` +
        `Localisation: ${location}\n\n` +
        `Produits:\n`;

    cart.forEach(item => {
        message += `- ${item.name} (${item.price} FCFA)\n`;
    });

    message += `\nTotal: ${total} FCFA`;

    const url = `https://wa.me/22890114140?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
