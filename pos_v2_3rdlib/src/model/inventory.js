function Inventory() {

}

Inventory.prototype.toString = function(cart) {
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
  inventoryText += cart.getCartItemsText();
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += cart.getPromotionsText();
  inventoryText += '----------------------\n' ;
  inventoryText += '总计：' + cart.getPayThePrice().toFixed(2) + '(元)\n';
  inventoryText += '节省：' + cart.getPromotionTotalPrice().toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';
  return inventoryText;

};
