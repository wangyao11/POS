function Cart(){
  var cartItems = [];
}

Cart.prototype.setCartItems = function(tags){
  var allItems = loadAllItems();

  _.forEach(tags, function(tag){
    var tagArray = tag.split("-");
    var barcode = tagArray[0];
    var count = 1;
    if (tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }

    var cartItem = _.find(this.cartItems, function(cartItem){
      return barcode === cartItem.item.barcode;
    });
    if (cartItem) {
      cartItem.count += count;
    } else {
      var item = _.find(allItems, function(item){
        return barcode === item.barcode;
      });
      this.cartItems.push({item : item, count : count});
    }
  });
};

Cart.prototype.getCartItems = function(){
  return this.cartItems;
};
