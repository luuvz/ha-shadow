// Récupère le panier dans le stockage local, sinon crée un tableau vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ajouter un produit au panier
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !");
}

// Afficher le panier dans panier.html
if (window.location.pathname.includes("panier.html")) {
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    cart.forEach((item, index) => {
        let priceText = item.price === "sur_commande" ? "Sur commande" : item.price + " F CFA";
        if (item.price !== "sur_commande") total += item.price;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${priceText}</td>
                <td><button onclick="removeItem(${index})">Supprimer</button></td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = "Total : " + total + " F CFA";
}
}// Commander via WhatsApp
function commander() {
    const nomClient = document.getElementById('nom').value;
    const telClient = document.getElementById('telephone').value;
    const adresseClient = document.getElementById('adresse').value;

    if (!nomClient || !telClient || !adresseClient) {
        alert('Veuillez remplir toutes vos coordonnées.');
        return;
    }

    if (panier.length === 0) {
        alert('Votre panier est vide.');
        return;
    }

    let message = `Bonjour, je souhaite commander:\n`;
    panier.forEach(item => {
        message += `- ${item.nom} : ${item.prix} XOF\n`;
    });
    message += `Total: ${total} XOF\n\n`;
    message += `Nom: ${nomClient}\nTéléphone: ${telClient}\nAdresse: ${adresseClient}`;

    const urlWhatsApp = `https://wa.me/22890114140?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, '_blank');
    }
// Supprimer un produit
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // rafraîchit la page
}
