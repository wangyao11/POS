function Cart(){
   this.cartItems = [];
}
Cart.prototype.addCartItem = function(myitem){
  var cartItems = this.cartItems;
  var cartItem = _.find(cartItems, function(cartItem){
    return myitem.item.barcode === cartItem.item.barcode;
  });
  if(cartItem){
    cartItem.count += myitem.count;
  }else{
    cartItems.push(myitem);
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
    var promotion = _.find(promotions,{type:'BUY_TWO_GET_ONE_FREE'});

    var promotionBarcode = _.find(promotion.barcodes,function(promotionBarcode){
      return promotionBarcode === cartItem.item.barcode;
    });

    if (promotionBarcode) {

      promotionItems.push(new PromotionItem(cartItem.item.name, cartItem.item.unit,
        parseInt(cartItem.count / 3), cartItem.item.price ));
      }
    });
  return promotionItems;
};

Cart.prototype.getCartItemsText = function(){
  var promotionItems = this.getPromotionItems();
  var text = '';

  _.forEach(this.cartItems, function(cartItem){

    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;
    var promotionCount;

    _.forEach(promotionItems, function(promotionItem){
      if(promotionItem.name === cartItem.item.name){
        promotionCount = promotionItem.promotionCount;
      }
    });
    var paymentCount = count - promotionCount;

    var subtotal = promotionCount > 0 ? paymentCount * price
    : count * price;

    text += '名称：' + item.name +
    '，数量：' + count + item.unit +
    '，单价：' + price.toFixed(2) +
    '(元)，小计：'+ subtotal.toFixed(2) + '(元)\n';

  });
  return text;
};

Cart.prototype.getPromotionPrice = function(){
  var promotionItems = this.getPromotionItems();
  var promotionPrice = 0;

  _.forEach(promotionItems, function(promotionItem){
    promotionPrice += promotionItem.promotionCount * promotionItem.promotionPrice;
  });

  return promotionPrice;
};
