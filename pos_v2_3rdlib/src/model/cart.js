function Cart(){
   this.cartItems = [];
}
Cart.prototype.addCartItem = function(oneCartItem){
  var cartItems = this.cartItems;
  var cartItem = _.find(cartItems, function(cartItem){
    return oneCartItem.item.barcode === cartItem.item.barcode;
  });
  if (cartItem) {
    cartItem.count += oneCartItem.count;
  } else {
    cartItems.push(oneCartItem);
  }
};

Cart.prototype.getCartItems = function(){
  return this.cartItems;
};

Cart.prototype.getPromotionItems = function(){
  var cartItems = this.cartItems;
  var promotionItems = [];

  _.forEach(cartItems,function(cartItem){
    var promotions = loadPromotions();
    var promotion = _.find(promotions, {type:'BUY_TWO_GET_ONE_FREE'});

    var promotionBarcode = _.find(promotion.barcodes, function(promotionBarcode){
      return promotionBarcode === cartItem.item.barcode;
    });

    if (promotionBarcode) {
      promotionItems.push({
        name : cartItem.item.name,
        unit : cartItem.item.unit,
        number : parseInt(cartItem.count / 3),
        price:cartItem.item.price});
      }
    });
  return promotionItems;
};

Cart.prototype.getCartItemsText = function(){
  var promotionItems = this.getPromotionItems();
  var cartItemsText = '';

  _.forEach(this.cartItems, function(cartItem){

    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;
    var promotionCount;

    _.forEach(promotionItems, function(promotionItem){
      if(promotionItem.name === cartItem.item.name){
        promotionCount = promotionItem.number;
      }
    });
    var paymentCount = count - promotionCount;

    var subtatal = cartItem.getSubtotal(paymentCount);

    cartItemsText += cartItem.toInventoryText(paymentCount);
  });
  return cartItemsText;
};

Cart.prototype.getPromotionTotalPrice = function(){
  var promotionItems = this.getPromotionItems();
  var promotionTotalPrice = 0;

  _.forEach(promotionItems, function(promotionItem){
    promotionTotalPrice += promotionItem.number * promotionItem.price;
  });

  return promotionTotalPrice;
};

Cart.prototype.getPromotionsText = function(){
  var promotionItems = this.getPromotionItems();
  var promotionsText = '';
  for(var i = 0; i < promotionItems.length; i++){
    promotionsText += '名称：'+promotionItems[i].name +
    '，数量：'+promotionItems[i].number+ promotionItems[i].unit + '\n';
  }

  return promotionsText;
};

Cart.prototype.getTotalPrices = function(){
  var totalPrices = 0;
  _.forEach(this.cartItems,function(cartItem){
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    totalPrices += count*price;
  });

  return totalPrices;
};
