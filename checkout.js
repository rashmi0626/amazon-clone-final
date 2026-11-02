// SHOPSMART CHECKOUT SYSTEM

// LOAD CART DATA

const checkoutCart = JSON.parse(
    sessionStorage.getItem("shopSmartCheckoutCart") || "[]"
);

const checkoutItems = document.getElementById("checkoutItems");


// DISPLAY ORDER SUMMARY

function displayCheckoutSummary() {

    checkoutItems.innerHTML = "";

    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty!</p>
            <a href="index.html">Continue Shopping</a>
        `;

        document.getElementById("checkoutSubtotal").innerText = "₹0";
        document.getElementById("checkoutDelivery").innerText = "₹0";
        document.getElementById("checkoutTotal").innerText = "₹0";

        document.querySelector(".place-order-btn").disabled = true;

        return;
    }

    let subtotal = 0;

    checkoutCart.forEach(item => {

        subtotal += item.price * item.quantity;

        checkoutItems.innerHTML += `

            <div class="checkout-product">

                <img src="${item.image}" alt="${item.name}">

                <div class="checkout-product-info">

                    <strong>${item.name}</strong>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                </div>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

            </div>

        `;
    });

    const delivery = subtotal >= 2000 ? 0 : 50;

    const total = subtotal + delivery;

    document.getElementById("checkoutSubtotal").innerText =
        "₹" + subtotal;

    document.getElementById("checkoutDelivery").innerText =
        "₹" + delivery;

    document.getElementById("checkoutTotal").innerText =
        "₹" + total;
}


// PLACE ORDER

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (checkoutCart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("customerName").value.trim();

    const email = document.getElementById("customerEmail").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const address = document.getElementById("customerAddress").value.trim();

    const city = document.getElementById("customerCity").value.trim();

    const pin = document.getElementById("customerPin").value.trim();

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    if (!name || !email || !phone || !address || !city || !pin) {
        alert("Please complete all delivery details!");
        return;
    }

    let subtotal = 0;

    checkoutCart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const delivery = subtotal >= 2000 ? 0 : 50;

    const total = subtotal + delivery;

    // Generate a demo order number
    const orderId = "SS" + Date.now().toString().slice(-8);

// SAVE ORDER TO ORDER HISTORY

const order = {

    orderId: orderId,

    customerName: name,

    email: email,

    phone: phone,

    address: address,

    city: city,

    pin: pin,

    payment: payment,

    items: checkoutCart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
    })),

    subtotal: subtotal,

    delivery: delivery,

    total: total,

    orderDate: new Date().toISOString(),

    estimatedDelivery: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        return date.toISOString();
    })(),

    status: "Order Placed"

};

const savedOrders = JSON.parse(
    localStorage.getItem("shopSmartOrders") || "[]"
);

savedOrders.unshift(order);

localStorage.setItem(
    "shopSmartOrders",
    JSON.stringify(savedOrders)
);

    // Show order confirmation
    document.querySelector(".checkout-container").innerHTML = `

        <div style="
            background:white;
            padding:35px;
            border-radius:10px;
            text-align:center;
            grid-column:1/-1;
        ">

            <h1 style="color:green;">
                ✓ Order Placed Successfully!
            </h1>

            <h2>Thank you, ${name}!</h2>

            <p>Your demo order has been created.</p>

            <br>

            <h3>Order ID: ${orderId}</h3>

            <h3>Grand Total: ₹${total}</h3>

            <p>Payment Method: ${payment}</p>

            <br>

            <p>Delivery Address:</p>

            <p>${address}, ${city} - ${pin}</p>

            <br>

            <a href="index.html"
               style="
                   display:inline-block;
                   padding:12px 25px;
                   background:#ffd814;
                   color:#111;
                   text-decoration:none;
                   border-radius:25px;
               ">
                Continue Shopping
            </a>

        </div>

    `;

    // Clear checkout cart after demo order
    sessionStorage.removeItem("shopSmartCheckoutCart");

});


// INITIAL DISPLAY

displayCheckoutSummary();
// ESTIMATED DELIVERY DATE

function showDeliveryDate() {

    const deliveryDateElement =
        document.getElementById("deliveryDate");

    if (!deliveryDateElement) return;

    const today = new Date();

    // Demo delivery estimate: 3–5 days
    const minDays = 3;
    const maxDays = 5;

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + minDays);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + maxDays);

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const start = startDate.toLocaleDateString("en-IN", options);
    const end = endDate.toLocaleDateString("en-IN", options);

    deliveryDateElement.innerText =
        start + " – " + end;

}

showDeliveryDate();