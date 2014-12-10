function Inventory(cart){
  this.cart = cart;
}

Inventory.prototype.toString = function(){
  dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
  };

  var inventoryText = '';
  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds()),
  formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

  inventoryText = '***<没钱赚商店>购物清单***\n' +
       '打印时间：' + formattedDateString + '\n';
  inventoryText += '----------------------\n';
  inventoryText += this.cart.getCartItemsText();
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += this.cart.getPromotionsText();
  inventoryText += '----------------------\n' ;
  inventoryText += '总计：' + (this.cart.getTotalPrices() - this.cart.getPromotionPrice()).toFixed(2) + '(元)\n';
  inventoryText += '节省：' + this.cart.getPromotionPrice().toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';
  return inventoryText;

};
