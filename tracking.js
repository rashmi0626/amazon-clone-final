const trackingSteps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered"
];

function trackOrder() {

    const orderId = document
        .getElementById("orderIdInput")
        .value.trim();

    const result = document.getElementById("trackingResult");

    const orders = JSON.parse(
        localStorage.getItem("shopSmartOrders") || "[]"
    );

    const order = orders.find(
        item => String(item.orderId) === orderId
    );

    if (!order) {
        result.innerHTML = `
            <div class="tracking-card">
                <h3>Order Not Found!</h3>
                <p>Please check your Order ID.</p>
            </div>
        `;
        return;
    }

    const currentStatus = trackingSteps.indexOf(order.status);

    const statusIndex = currentStatus === -1 ? 0 : currentStatus;

    const deliveryDate = order.estimatedDelivery
        ? new Date(order.estimatedDelivery).toDateString()
        : "Not available";

    result.innerHTML = `

        <div class="tracking-card">

            <h2>Order Details</h2>

            <p><strong>Order ID:</strong> ${order.orderId}</p>

            <p><strong>Customer:</strong> ${order.customerName || "Customer"}</p>

            <p><strong>Total:</strong> ₹${order.total}</p>

            <p><strong>Estimated Delivery:</strong> ${deliveryDate}</p>

            <h3>Delivery Progress</h3>

            <div class="tracking-timeline">

                ${trackingSteps.map((step, index) => `

                    <div class="tracking-step
                        ${index <= statusIndex ? "completed" : ""}">

                        <div class="tracking-dot">
                            ${index <= statusIndex ? "✓" : ""}
                        </div>

                        <p>${step}</p>

                    </div>

                `).join("")}

            </div>

            <h3 class="current-status">
                Current Status: ${order.status}
            </h3>

        </div>

    `;

}