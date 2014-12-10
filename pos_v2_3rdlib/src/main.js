function printInventory(tags) {

  var cart = new Cart();
  cart.setCartItems(tags);
  cart.setPromotionItems();

  var inventory = new Inventory();

  inventory.setCartItemsText(cart.getCartItems(),cart.getPromotionItems());
  inventory.setPromotionsText(cart.getPromotionItems());
  inventory.setTotalPrices(cart.getCartItems());
  inventory.setPromotionPrice(cart.getPromotionItems());
  inventory.setInventoryText();


  console.log(inventory.getInventoryText());
}
