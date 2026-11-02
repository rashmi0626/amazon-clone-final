const defaultProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        oldPrice: 2499,
        rating: 4.5,
        discount: 40,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        stock: 10
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        oldPrice: 2999,
        rating: 4.2,
        discount: 33,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        stock: 15
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2499,
        oldPrice: 3999,
        rating: 4.7,
        discount: 38,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        stock:4
    },
    {
        id: 4,
        name: "Travel Backpack",
        price: 999,
        oldPrice: 1599,
        rating: 4.3,
        discount: 38,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        stock:2

    },
    {
        id: 5,
        name: "Camera",
        price: 4999,
        oldPrice: 6999,
        rating: 4.6,
        discount: 29,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        stock:6
    },
    {
        id: 6,
        name: "Home Lamp",
        price: 799,
        oldPrice: 1199,
        rating: 4.1,
        discount: 33,
        category: "Home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        stock:12
    }
];

let products = JSON.parse(localStorage.getItem("shopSmartProducts"))
  || defaultProducts;
  if (!localStorage.getItem("shopSmartProducts")) {
    localStorage.setItem(
        "shopSmartProducts",
        JSON.stringify(products)
    );
}
// DISPLAY PRODUCTS

function displayProducts(items) {

    const container = document.getElementById("productContainer");

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<h3>No products found!</h3>";
        return;
    }

    items.forEach(product => {

        container.innerHTML += `
           <div class="product-card"
     onclick="openProductDetails(${product.id}, event)">

                <span class="discount">
                    ${product.discount}% OFF
                </span>

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <div class="product-rating">
                    ⭐ ${product.rating} / 5
                </div>

                <div class="product-price">
                    ₹${product.price}
                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>
                </div>

                <button class="add-cart"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
                <button class="wishlist-btn"
                onclick="addToWishlist(${product.id})">
                ❤️ Add to Wishlist
                </button>

               <button class="details-btn"
    onclick="openProductDetails(${product.id})">
    View Details
</button>

            </div>
        `;
    });
}


// ADVANCED SHOPPING CART

let cart = JSON.parse(
    localStorage.getItem("shopSmartCart") || "[]"
);

// ADD PRODUCT TO CART
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert("Product not found!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("shopSmartCart")) || [];

    const cartItem = cart.find(item => item.id === productId);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    if (currentQuantity >= product.stock) {
        alert("Sorry! Available stock limit reached.");
        return;
    }

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("shopSmartCart", JSON.stringify(cart));

    alert("Product added to cart!");
}
// DISPLAY CART

function displayCart() {

    const cartContainer = document.getElementById("cartItems");

    cartContainer.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty!</h3>
                <p>Add some products to start shopping.</p>
            </div>
        `;

        document.getElementById("subtotal").innerText = "₹0";
        document.getElementById("delivery").innerText = "₹0";
        document.getElementById("total").innerText = "₹0";

        return;
    }

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-product-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>

                <div class="quantity-controls">

                    <button onclick="updateQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="updateQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                    ₹${item.price * item.quantity}
                </strong>

                <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    const delivery = subtotal >= 2000 ? 0 : 50;

    const grandTotal = subtotal + delivery;

    document.getElementById("subtotal").innerText =
        "₹" + subtotal;

    document.getElementById("delivery").innerText =
        "₹" + delivery;

    document.getElementById("total").innerText =
        "₹" + grandTotal;
}

// UPDATE QUANTITY

function updateQuantity(id, change) {

    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        displayCart();
    }
}

// REMOVE PRODUCT

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    displayCart();
}

// CHECKOUT

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save cart for checkout page
    sessionStorage.setItem(
        "shopSmartCheckoutCart",
        JSON.stringify(cart)
    );

    // Open checkout page
    window.location.href = "checkout.html";

}

function searchProducts() {

    const query = document.getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("category").value;

    const sortBy = document.getElementById("sortBy").value;

    // SEARCH AND CATEGORY FILTER

    let filtered = products.filter(product => {

        const matchesName = product.name.toLowerCase().includes(query);

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesName && matchesCategory;

    });

    // SORT PRODUCTS

    if (sortBy === "low") {

        filtered.sort((a, b) => a.price - b.price);

    } else if (sortBy === "high") {

        filtered.sort((a, b) => b.price - a.price);

    }

    // DISPLAY PRODUCTS

    displayProducts(filtered);

}

// Show products when website loads
displayProducts(products);
displayCart();


// SHOPSMART IMAGE SLIDER

document.addEventListener("DOMContentLoaded", function () {

    let currentSlideIndex = 0;

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (slides.length === 0) {
        console.error("No slides found!");
        return;
    }

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        currentSlideIndex =
            (index + slides.length) % slides.length;

        slides[currentSlideIndex].classList.add("active");

        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add("active");
        }
    }

    window.changeSlide = function (direction) {
        showSlide(currentSlideIndex + direction);
    };

    window.goToSlide = function (index) {
        showSlide(index);
    };

    // Automatic sliding every 3 seconds
    setInterval(function () {
        showSlide(currentSlideIndex + 1);
    }, 3000);

    showSlide(0);

});
// FILTER AND SORT PRODUCTS

function filterProducts() {

    const category =
        document.getElementById("filterCategory").value;

    const sorting =
        document.getElementById("sortProducts").value;

    let filtered = products.filter(product => {
        return category === "All" ||
               product.category === category;
    });

    if (sorting === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sorting === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sorting === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(filtered);
}

// PRODUCT DETAILS

function viewDetails(id) {

    const product = products.find(p => p.id === id);

    alert(
        "Product: " + product.name +
        "\nPrice: ₹" + product.price +
        "\nRating: " + product.rating +
        "\nCategory: " + product.category
    );
}

// INITIAL DISPLAY

displayProducts(products);

// SHOPSMART WISHLIST SYSTEM

// Load saved wishlist
let wishlist = JSON.parse(
    localStorage.getItem("shopSmartWishlist")
) || [];


// SAVE WISHLIST

function saveWishlist() {
    localStorage.setItem(
        "shopSmartWishlist",
        JSON.stringify(wishlist)
    );
}


// ADD TO WISHLIST

function addToWishlist(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    if (wishlist.includes(id)) {
        alert("This product is already in your wishlist!");
        return;
    }

    wishlist.push(id);

    saveWishlist();
    displayWishlist();

    alert(product.name + " added to wishlist! ❤️");
}


// DISPLAY WISHLIST

function displayWishlist() {

    const container = document.getElementById("wishlistItems");

    if (!container) return;

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `
            <p class="wishlist-empty">
                ❤️ Your wishlist is empty!
                Start adding your favourite products.
            </p>
        `;

        return;
    }

    wishlist.forEach(id => {

        const product = products.find(p => p.id === id);

        if (!product) return;

        container.innerHTML += `

            <div class="wishlist-card">

                <img src="${product.image}"
                     alt="${product.name}">

                <h3>${product.name}</h3>

                <p class="wishlist-price">
                    ₹${product.price}
                </p>

                <button class="move-cart-btn"
                    onclick="moveToCart(${product.id})">
                    🛒 Move to Cart
                </button>

                <button class="wishlist-remove"
                    onclick="removeFromWishlist(${product.id})">
                    Remove ❤️
                </button>

            </div>

        `;
    });
}


// REMOVE FROM WISHLIST

function removeFromWishlist(id) {

    wishlist = wishlist.filter(item => item !== id);

    saveWishlist();
    displayWishlist();

}


// MOVE WISHLIST PRODUCT TO CART

function moveToCart(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    // Use existing cart function
    addToCart(id);

    removeFromWishlist(id);

}


// INITIAL WISHLIST DISPLAY

displayWishlist();
// OPEN PRODUCT DETAILS PAGE

function openProductDetails(id, event) {

    // Don't navigate when customer clicks a button or link
    if (event && event.target.closest("button, a, input")) {
        return;
    }

    window.location.href = `product-details.html?id=${id}`;
}
req.accepts(function openProductDetails(id) {
    window.location.href = `product-details.html?id=${id}`;
});const currentUser = JSON.parse(
    localStorage.getItem("shopSmartCurrentUser")
);

if (currentUser) {
    console.log("Welcome, " + currentUser.name);
}
document.addEventListener("DOMContentLoaded", function () {

    const userGreeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");

    const currentUser = JSON.parse(
        localStorage.getItem("shopSmartCurrentUser")
    );

    if (currentUser) {
        userGreeting.textContent = "Hello, " + currentUser.name;
        userGreeting.href = "#";

        logoutBtn.style.display = "inline-block";
    }

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("shopSmartCurrentUser");
        window.location.reload();
    });

});