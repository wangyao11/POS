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

Cart.prototype.getPromotionTotalPrice = function() {
  var promotionItems = this.getPromotionItems();
  var promotionTotalPrice = 0;

  _.forEach(promotionItems, function(promotionItem) {
    promotionTotalPrice += promotionItem.count * promotionItem.price;
  });

  return promotionTotalPrice;
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
  _.forEach(this.cartItems,function(cartItem) {
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    totalPrices += count*price;
  });

  return totalPrices;
};

Cart.prototype.getPayThePrice = function(){

  return this.getTotalPrices() - this.getPromotionTotalPrice();

};

Cart.prototype.getPromotionItems = function() {
  var promotionItems = [];
  var promotions = Promotion.all();
  _.forEach(this.cartItems,function(cartItem) {
    var item = cartItem.item;
    var count = cartItem.count;
    var type = cartItem.getPromotionType();
    if (type === 'BUY_TWO_GET_ONE_FREE') {
      promotionItems.push(new PromotionItem(item.name,
        item.unit,
        parseInt(count / 3),
        item.price));

    }
  });
  return promotionItems;
  };
