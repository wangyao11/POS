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
         '(元)，小计：'+ this.getSubtotal().toFixed(2) + '(元)\n';

};

CartItem.prototype.getPromotionType = function() {
  var promotions = Promotion.all();
  var _this = this;
  var type = '';
  _.forEach(promotions, function(promotion){
    var promotionBarcode = _.find(promotion.barcodes, function(promotionBarcode) {
      return promotionBarcode === _this.item.barcode;
    });
    if(promotionBarcode) {
      type =  promotion.type;
    }
  });
  return type;
};
