function printInventory(tags){

  var cart = new Cart();

  cart.setCartItems(tags);

  console.log(cart.getCartItems());

  console.log('打印清单！');
}
