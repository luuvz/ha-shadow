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

// Supprimer un produit
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // rafraîchit la page
}
