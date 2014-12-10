function Inventory(cart){
  this.cart = cart;
  this.inventoryText = '';
  this.promotionsText = '';
  this.totalPrices = 0;
  this.promotionPrice = 0;
}

Inventory.prototype.setInventoryText = function(cartItems){
  dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
  };

  var text = '';
  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

  text = '***<没钱赚商店>购物清单***\n' +
         '打印时间：' + formattedDateString + '\n';
  text += '----------------------\n';
  text += this.cart.getCartItemsText();
  text += '----------------------\n';
  text += '挥泪赠送商品：\n';
  text += this.promotionsText;
  text += '----------------------\n' ;
  text += '总计：' + (this.totalPrices - this.promotionPrice).toFixed(2) + '(元)\n';
  text += '节省：' + this.promotionPrice.toFixed(2) + '(元)\n' ;
  text += '**********************';
  this.inventoryText = text;

};

Inventory.prototype.getInventoryText = function(){
  return this.inventoryText;
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
};

Inventory.prototype.setTotalPrices = function(cartItems){
  var totalPrices = 0;
  _.forEach(cartItems,function(cartItem){
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    totalPrices += count*price;
  });

  this.totalPrices = totalPrices;
};

Inventory.prototype.getTotalPrices = function(cartItems){
  return this.totalPrices;
};

Inventory.prototype.setPromotionPrice = function(globalPromotions){
  var promotionPrice = 0;
  _.forEach(globalPromotions, function(globalPromotion){
    promotionPrice += globalPromotion.promotionCount * globalPromotion.promotionPrice;
  });

  this.promotionPrice = promotionPrice;
};

Inventory.prototype.getPromotionPrice = function(){
  return this.promotionPrice;
};
