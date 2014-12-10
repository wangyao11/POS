function Cart(){
   this.cartItems = [];
   this.promotionItems = [];
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

Cart.prototype.setPromotionItems = function(){
  var cartItems = this.cartItems;
  var promotionItems = this.promotionItems;

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
};

Cart.prototype.getPromotionItems = function(){
    return this.promotionItems;
};
