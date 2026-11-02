
const productId = new URLSearchParams(
    window.location.search
).get("id");

const savedProducts = JSON.parse(
    localStorage.getItem("shopSmartProducts") || "[]"
);

const product = savedProducts.find(
    item => String(item.id) === String(productId)
);

const container = document.getElementById("productDetails");

if (!product) {

    container.innerHTML = `
        <h2>Product Not Found!</h2>
        <a href="index.html">Return to Shopping</a>
    `;

} else {

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    container.innerHTML = `

        <div class="product-detail-card">

            <div class="detail-image">
                <img src="${product.image}"
                     alt="${product.name}">
            </div>

            <div class="detail-info">

                <h1>${product.name}</h1>

                <p class="detail-category">
                    Category: ${product.category}
                </p>

                <p class="detail-rating">
                    ⭐ ${product.rating || 4} / 5
                </p>

                <h2 class="detail-price">
                    ₹${product.price}
                </h2>
${product.stock > 0
    ? `<p class="stock-status">
         Available Stock: ${product.stock}
       </p>`
    : `<p class="out-of-stock">
         Out of Stock
       </p>`
}
                <p class="detail-discount">
                    ${product.discount || 0}% OFF
                </p>

                <p class="detail-old-price">
                    MRP: ₹${product.oldPrice || product.price}
                </p>

                <div class="delivery-info">

                    <h3>Delivery Information</h3>

                    <p>
                        Estimated delivery:
                        ${deliveryDate.toDateString()}
                    </p>

                    <p>Free delivery on eligible orders.</p>

                </div>

                <button class="detail-cart-btn"
                        id="addDetailCart">
                    Add to Cart
                </button>

                <button class="detail-buy-btn"
                        id="buyDetailNow">
                    Buy Now
                </button>
<hr>

<div class="reviews-section">

    <h3>Customer Reviews ⭐</h3>

    <div class="review-form">

        <label>Your Rating</label>

        <select id="reviewRating">
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
        </select>

        <textarea
            id="reviewText"
            placeholder="Write your review..."
        ></textarea>

        <button id="submitReviewBtn">
            Submit Review
        </button>

    </div>

    <div id="reviewsList"></div>

</div>
            </div>

        </div>
    `;

}
// ADD TO CART BUTTON

document.getElementById("addDetailCart")
    .addEventListener("click", function () {

        addToCart(product.id);

    });
    // BUY NOW BUTTON

document.getElementById("buyDetailNow")
    .addEventListener("click", function () {

        addToCart(product.id);

        window.location.href = "checkout.html";

    });
    // DISPLAY EXISTING REVIEWS
displayProductReviews(product.id);

// SUBMIT REVIEW
document.getElementById("submitReviewBtn")
.addEventListener("click", function () {

    const rating =
        document.getElementById("reviewRating").value;

    const review =
        document.getElementById("reviewText").value;

    addProductReview(product.id, rating, review);

    document.getElementById("reviewText").value = "";

});