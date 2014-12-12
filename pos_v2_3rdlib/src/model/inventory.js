function Inventory() {

}

Inventory.prototype.toString = function(cart) {

  var inventoryText = '';

  inventoryText = '***<没钱赚商店>购物清单***\n' +
       '打印时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss') + '\n';
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
