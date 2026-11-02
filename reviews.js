function getProductReviews(productId) {
    const allReviews = JSON.parse(
        localStorage.getItem("shopSmartReviews") || "{}"
    );

    return allReviews[productId] || [];
}

function addProductReview(productId, rating, reviewText) {
    if (!rating || !reviewText.trim()) {
        alert("Please select a rating and write a review.");
        return;
    }

    const allReviews = JSON.parse(
        localStorage.getItem("shopSmartReviews") || "{}"
    );

    if (!allReviews[productId]) {
        allReviews[productId] = [];
    }

    allReviews[productId].push({
        rating: Number(rating),
        review: reviewText.trim(),
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem(
        "shopSmartReviews",
        JSON.stringify(allReviews)
    );

    alert("Your review has been submitted!");
    displayProductReviews(productId);
}

function displayProductReviews(productId) {
    const container = document.getElementById("reviewsList");

    if (!container) return;

    const reviews = getProductReviews(productId);

    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet.</p>";
        return;
    }

    container.innerHTML = reviews.map(item => `
        <div class="review-item">
            <p>${"⭐".repeat(item.rating)}</p>
            <p>${escapeReviewText(item.review)}</p>
            <small>${item.date}</small>
        </div>
    `).join("");
}

function escapeReviewText(text) {
    const element = document.createElement("div");
    element.textContent = text;
    return element.innerHTML;
}