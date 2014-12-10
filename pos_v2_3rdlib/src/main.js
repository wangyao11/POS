function printInventory(tags) {

  var cart = new Cart();
  var inventory = new Inventory();

  cart.setCartItems(tags);

  inventory.setInventoryText(cart.getCartItems());
  var inventoryText = inventory.getInventoryText();

  console.log(inventoryText);
}
