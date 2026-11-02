
 // SHOPSMART ORDER HISTORY SYSTEM

function displayOrders() {

    const container = document.getElementById("ordersList");

    const orders = JSON.parse(
        localStorage.getItem("shopSmartOrders") || "[]"
    );

    container.innerHTML = "";

    if (orders.length === 0) {

        container.innerHTML = `
            <div class="no-orders">
                <h2>📦 No Orders Yet!</h2>
                <p>You haven't placed any orders.</p>
                <a href="index.html">Start Shopping</a>
            </div>
        `;

        return;
    }

    orders.forEach((order, index) => {

        const orderDate = new Date(
            order.orderDate
        ).toLocaleDateString("en-IN");

        const deliveryDate = new Date(
            order.estimatedDelivery
        ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const productsHTML = order.items.map(item => `

            <div class="order-product">

                <img src="${item.image}" alt="${item.name}">

                <div class="order-product-info">

                    <h3>${item.name}</h3>

                    <p>Quantity: ${item.quantity}</p>

                    <strong>₹${item.price}</strong>

                </div>

            </div>

        `).join("");

        container.innerHTML += `

            <div class="order-card">

                <div class="order-card-header">

                    <div>
                        <small>ORDER PLACED</small>
                        <p>${orderDate}</p>
                    </div>

                    <div>
                        <small>ORDER ID</small>
                        <p>${order.orderId}</p>
                    </div>

                    <div>
                        <small>TOTAL</small>
                        <p>₹${order.total}</p>
                    </div>

                </div>

                <div class="order-card-body">

                    <span class="order-status">
                        ${order.status}
                    </span>

                    <h3 style="margin-top:15px;">
                        Estimated Delivery: ${deliveryDate}
                    </h3>

                    ${productsHTML}

                    <p class="order-total">
                        Total: ₹${order.total}
                    </p>

                    <button class="order-details-btn"
                        onclick="showOrderDetails(${index})">
                        View Order Details
                    </button>
<button class="order-details-btn"
    onclick="window.location.href='track-order.html'">
    Track Order 📦
</button>
                </div>

            </div>

        `;
    });

}


// VIEW ORDER DETAILS

function showOrderDetails(index) {

    const orders = JSON.parse(
        localStorage.getItem("shopSmartOrders") || "[]"
    );

    const order = orders[index];

    if (!order) return;

    alert(
        "ORDER DETAILS\n\n" +
        "Order ID: " + order.orderId +
        "\nCustomer: " + order.customerName +
        "\nEmail: " + order.email +
        "\nPhone: " + order.phone +
        "\nAddress: " + order.address +
        ", " + order.city +
        " - " + order.pin +
        "\nPayment: " + order.payment +
        "\nSubtotal: ₹" + order.subtotal +
        "\nDelivery: ₹" + order.delivery +
        "\nGrand Total: ₹" + order.total
    );

}


// INITIALIZE ORDER HISTORY

displayOrders();
