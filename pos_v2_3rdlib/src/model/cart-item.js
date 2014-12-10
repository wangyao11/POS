function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
}

CartItem.getCartItems = function(tags) {
  var allItems = loadAllItems();
  var cartItems = [];
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
  return cartItems;
};
