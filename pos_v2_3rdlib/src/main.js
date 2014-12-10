function printInventory(tags) {
  var scanner = new Scanner();
  var cart = new Cart();
  _.forEach(tags, function(tag){
    cart.addCartItem(scanner.scan(tag));
  });

  //var promotionItems = cart.getPromotionItems();

  var inventory = new Inventory(cart);

  console.log(inventory.toString());
}
