function Cart() {
   this.cartItems = [];
}
Cart.prototype.addCartItem = function(oneCartItem) {
  var cartItems = this.cartItems;
  var cartItem = _.find(cartItems, function(cartItem) {
    return cartItem.item.barcode === oneCartItem.item.barcode;
  });
  if (cartItem) {
    cartItem.count += oneCartItem.count;
  } else {
    cartItems.push(oneCartItem);
  }
};

Cart.prototype.getCartItemsText = function() {

  var cartItemsText = '';

  _.forEach(this.cartItems, function(cartItem) {

    PromotionUtil.judgeCartItem(cartItem);

    cartItemsText += cartItem.toInventoryText();

  });

  return cartItemsText;
};

Cart.prototype.getPromotionsText = function() {
  var promotionsText = '';

  _.forEach(this.cartItems, function(cartItem) {

    promotionsText += cartItem.getPromotionText(cartItem);

  });

  return promotionsText;
};

Cart.prototype.getTotalPrices = function() {
  var totalPrices = 0;

  _.forEach(this.cartItems, function(cartItem) {
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    totalPrices += count*price;
  });

  return totalPrices;
};

Cart.prototype.getPromotionTotalPrice = function() {
  var promotionTotalPrice = 0;

  _.forEach(this.cartItems, function(cartItem) {
    var item = cartItem.item;
    var count = cartItem.promotionCount;
    var price = item.price;

    promotionTotalPrice += count*price;
  });

  return promotionTotalPrice;
};

Cart.prototype.getPayThePrice = function() {

  return this.getTotalPrices() - this.getPromotionTotalPrice();

};
