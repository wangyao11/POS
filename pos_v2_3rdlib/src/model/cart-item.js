function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
}
CartItem.prototype.getPaymentCount = function(){
  var item = this.item;
  var PaymentCount = 0;
  var promotions = loadPromotions();
  var promotion = _.find(promotions, {type:'BUY_TWO_GET_ONE_FREE'});

  var promotionBarcode = _.find(promotion.barcodes, function(promotionBarcode){
    return promotionBarcode === item.barcode;
  });
  if (promotionBarcode) {
    PaymentCount = parseInt(this.count / 3);
  }
  return PaymentCount;
};
CartItem.prototype.getSubtotal = function() {
  console.log(this.getPaymentCount());
  return this.item.price * (this.count - this.getPaymentCount());
};

CartItem.prototype.toInventoryText = function() {
  return '名称：' + this.item.name +
         '，数量：' + this.count + this.item.unit +
         '，单价：' + this.item.price.toFixed(2) +
         '(元)，小计：'+ this.getSubtotal().toFixed(2) + '(元)\n';

};
