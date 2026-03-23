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
    li.textContent = `${item.name} - €${item.price} x ${item.quantity}`;
    cartList.appendChild(li);
  });
}

// Initial render
showCart();

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCart() {
  showCart();
  document.getElementById("total").textContent = getTotal().toFixed(2);
}

// Initial render
updateCart();