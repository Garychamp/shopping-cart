const cart = [
  { id: 1, name: "Milk", price: 2.50, quantity: 2 },
  { id: 2, name: "Bread", price: 1.80, quantity: 2 },
  { id: 3, name: "Eggs", price: 3.20, quantity: 3 }
];

function showCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear the list first

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - €${item.price} x ${item.quantity} `;

    // Button to increase quantity
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.onclick = () => {
      item.quantity += 1;
      updateCart();
    };

    // Button to remove item
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      removeItem(item.name);
      updateCart();
    };

    li.appendChild(addBtn);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

// Initial render
showCart();

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function removeItem(itemName) {
  const index = cart.findIndex((item) => item.name === itemName);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

function updateCart() {
  showCart();
  document.getElementById("total").textContent = getTotal().toFixed(2);
}

// Initial render
updateCart();

// Function to add a new item
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

    // Clear input fields
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";

    updateCart();
  } else {
    alert("Please enter valid item details.");
  }
}

// Add event listener to button
document.getElementById("add-item-btn").addEventListener("click", addItem);