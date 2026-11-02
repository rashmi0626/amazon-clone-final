// Load products from the existing products array
function displayAdminProducts() {
  const container = document.getElementById("adminProductList");

  container.innerHTML = "";

  products.forEach(product => {
    const item = document.createElement("div");
    item.className = "admin-product";

    item.innerHTML = `
      <span>${product.name} - ₹${product.price}</span>
      <button onclick="deleteAdminProduct(${product.id})">
        Delete
      </button>
    `;

    container.appendChild(item);
  });
}

// Add a new product
document.getElementById("adminProductForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: document.getElementById("productName").value,
      price: Number(document.getElementById("productPrice").value),
      oldPrice: Number(document.getElementById("productPrice").value),
      rating: 4,
      discount: 0,
      category: document.getElementById("productCategory").value,
      image: document.getElementById("productImage").value
    };

    products.push(newProduct);

    localStorage.setItem("shopSmartProducts", JSON.stringify(products));

    this.reset();
    displayAdminProducts();

    alert("Product added successfully!");
  });

// Delete a product
function deleteAdminProduct(id) {
  const confirmDelete = confirm("Delete this product?");

  if (!confirmDelete) return;

  const index = products.findIndex(product => product.id === id);

  if (index !== -1) {
    products.splice(index, 1);

    localStorage.setItem("shopSmartProducts", JSON.stringify(products));

    displayAdminProducts();
  }
}

displayAdminProducts();