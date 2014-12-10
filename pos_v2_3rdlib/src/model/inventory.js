function Inventory(){
  this.inventoryText = '';
  this.cartItemsText = '';
  this.promotionsText = '';
  this.totalPrices = 0;
  this.promotionPrice = 0;
}

Inventory.prototype.setInventoryText = function(cartItems){

  inventoryText = this.inventoryText;

  inventoryText = '***<没钱赚商店>购物清单***\n';
  inventoryText += this.cartItemsText;
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += this.promotionsText;
  inventoryText += '----------------------\n' ;
  inventoryText += '总计：' + totalPrices.toFixed(2) + '(元)\n';
  inventoryText += '节省：' + promotionPrice.toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';

};

Inventory.prototype.getInventoryText = function(cartItems){
  return this.inventoryText;
};

Inventory.prototype.setCartItemsText = function(cartItems,globalPromotions){

  var text = '';

  _.forEach(cartItems, function(cartItem){

    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;
    var promotionCount;
    //var promotionCount = getPromotionCount(cartItem,globalPromotions);
    _.forEach(globalPromotions,function(globalPromotion){
      if(globalPromotion.name === cartItem.item.name){
        promotionCount = globalPromotion.promotionCount;
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
  this.cartItemsText = text;
};

Inventory.prototype.getCartItemsText = function(){
  return this.cartItemsText;
};

Inventory.prototype.setPromotionsText = function(globalPromotions){
  var text = '';
  for(var i = 0; i < globalPromotions.length; i++){
    text += '名称：'+globalPromotions[i].name +
    '，数量：'+globalPromotions[i].promotionCount+ globalPromotions[i].unit + '\n';
  }
  this.promotionsText = text;
};

Inventory.prototype.getPromotionsText = function(){
  return this.promotionsText;
}
