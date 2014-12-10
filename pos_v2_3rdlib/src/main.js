function printInventory(tags) {
  var scanner = new Scanner();
  var cart = new Cart();
  _.forEach(tags, function(tag){
    cart.addCartItem(scanner.scan(tag));
  });

  console.log(cart.getCartItems());



  // var cart = new Cart();
  // cart.setCartItems(tags);
  // cart.setPromotionItems();
  //
  // var inventory = new Inventory();
  //
  // inventory.setCartItemsText(cart.getCartItems(),cart.getPromotionItems());
  // inventory.setPromotionsText(cart.getPromotionItems());
  // inventory.setTotalPrices(cart.getCartItems());
  // inventory.setPromotionPrice(cart.getPromotionItems());
  // inventory.setInventoryText();
  //
  //
  // console.log(inventory.getInventoryText());
}
