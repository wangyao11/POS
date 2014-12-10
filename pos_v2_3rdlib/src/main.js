function printInventory(tags) {

  var cart = new Cart();
  cart.setCartItems(tags);
  cart.setPromotionItems();

  console.log(cart.getPromotionItems());
  // var inventory = new Inventory();
  //
  // inventory.setCartItemsText();
  //
  //
  // inventory.setInventoryText(cart.getCartItems());
  // var t = inventory.getInventoryText();
  //
  // console.log(inventoryText);
}
