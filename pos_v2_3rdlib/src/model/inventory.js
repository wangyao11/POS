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
