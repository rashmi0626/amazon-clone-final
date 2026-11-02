let wishlist = JSON.parse(
    localStorage.getItem("shopSmartWishlist") || "[]"
);

function addToWishlist(id) {
    const savedProducts = JSON.parse(
        localStorage.getItem("shopSmartProducts") || "[]"
    );

    const product = savedProducts.find(
        p => String(p.id) === String(id)
    );

    if (!product) {
        alert("Product not found!");
        return;
    }

    const alreadyAdded = wishlist.some(
        item => String(item.id) === String(id)
    );

    if (alreadyAdded) {
        alert("Product is already in your wishlist!");
        return;
    }

    wishlist.push(product);

    localStorage.setItem(
        "shopSmartWishlist",
        JSON.stringify(wishlist)
    );

    alert("Added to Wishlist ❤️");
}

function displayWishlist() {
    const container = document.getElementById("wishlistProducts");

    if (!container) return;

    wishlist = JSON.parse(
        localStorage.getItem("shopSmartWishlist") || "[]"
    );

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    container.innerHTML = wishlist.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button onclick="removeFromWishlist(${product.id})">
                Remove ❤️
            </button>
        </div>
    `).join("");
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(
        item => String(item.id) !== String(id)
    );

    localStorage.setItem(
        "shopSmartWishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();
}

displayWishlist();