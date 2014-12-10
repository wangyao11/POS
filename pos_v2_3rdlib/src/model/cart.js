function Cart(){
   this.cartItems = [];
}
Cart.prototype.setCartItems = function(tags){
  var allItems = loadAllItems();
  var cartItems = this.cartItems;
  _.forEach(tags, function(tag){
    var tagArray = tag.split("-");
    var barcode = tagArray[0];
    var count = 1;
    if (tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }

    var cartItem = _.find(cartItems, function(cartItem){
      return barcode === cartItem.item.barcode;
    });
    if (cartItem) {
      cartItem.count += count;
    } else {
      var item = _.find(allItems, function(item){
        return barcode === item.barcode;
      });
      cartItems.push({item : item, count : count});
    }
  });
};

Cart.prototype.getCartItems = function(){
  return this.cartItems;
};
