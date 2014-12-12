function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
  this.promotionCount = 0;
}

CartItem.prototype.getPromotionCount = function(promotionCount) {
  this.promotionCount = promotionCount;
};

CartItem.prototype.getSubtotal = function() {
  return this.item.price * (this.count - this.promotionCount);
};

CartItem.prototype.toInventoryText = function() {
  return '名称：' + this.item.name +
         '，数量：' + this.count + this.item.unit +
         '，单价：' + this.item.price.toFixed(2) +
         '(元)，小计：' + this.getSubtotal().toFixed(2) + '(元)\n';

};

CartItem.prototype.getPromotionText = function() {
  var promotionText = '';

  if (this.promotionCount !== 0) {
    promotionText += '名称：' + this.item.name +
         '，数量：' + this.promotionCount + this.item.unit + '\n';
  }

  return promotionText;
};
