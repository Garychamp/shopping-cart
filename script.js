const cart = [
  { id: 1, name: "Milk", price: 2.50, quantity: 2 },
  { id: 2, name: "Bread", price: 1.80, quantity: 2 },
  { id: 3, name: "Eggs", price: 3.20, quantity: 3 }
];

// Show cart items
function showCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");

    // Text container
    const textDiv = document.createElement("div");
    textDiv.className = "item-text";
    textDiv.textContent = `${item.name} - €${item.price} x ${item.quantity}`;

    // Buttons container
    const btnDiv = document.createElement("div");
    btnDiv.className = "item-buttons";

    // Increase quantity button
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.onclick = () => {
      item.quantity += 1;
      updateCart();
    };

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      removeItem(item.name);
      updateCart();
    };

    btnDiv.appendChild(addBtn);
    btnDiv.appendChild(removeBtn);

    li.appendChild(textDiv);
    li.appendChild(btnDiv);

    cartList.appendChild(li);
  });
}

// Calculate total
function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Remove an item
function removeItem(itemName) {
  const index = cart.findIndex((item) => item.name === itemName);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

// Add a new item
function addItem() {
  const nameInput = document.getElementById("new-name");
  const priceInput = document.getElementById("new-price");
  const quantityInput = document.getElementById("new-quantity");

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const quantity = parseInt(quantityInput.value);

  if (name && !isNaN(price) && !isNaN(quantity)) {
    const newId = cart.length ? cart[cart.length - 1].id + 1 : 1;
    cart.push({ id: newId, name, price, quantity });

    // Clear inputs
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";

    updateCart();
  } else {
    alert("Please enter valid item details.");
  }
}

// Update cart and total
function updateCart() {
  showCart();
  document.getElementById("total").textContent = getTotal().toFixed(2);
}

// Event listener for add item button
document.getElementById("add-item-btn").addEventListener("click", addItem);

// Initial render
updateCart();