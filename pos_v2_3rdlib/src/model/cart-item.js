function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
}
CartItem.prototype.getPromotionCount = function() {
  var promotionCount = 0;

  var type = this.getPromotionType();

  if (type === 'BUY_TWO_GET_ONE_FREE') {
    promotionCount = parseInt(this.count / 3);
  }

  return promotionCount;
};

CartItem.prototype.getSubtotal = function() {
  return this.item.price * (this.count - this.getPromotionCount());
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
