function printInventory(tags) {
  var scanner = new Scanner();
  var cart = new Cart();
  _.forEach(tags, function(tag){
    cart.addCartItem(scanner.scan(tag));
  });

  var promotionItems = cart.getPromotionItems();

  var inventory = new Inventory(cart);

  //inventory.setCartItemsText(cart.getCartItems(),promotionItems);
  //inventory.setPromotionsText(promotionItems);
  inventory.setTotalPrices(cart.getCartItems());
  //inventory.setPromotionPrice(promotionItems);
  inventory.setInventoryText();


  console.log(inventory.getInventoryText());
}
