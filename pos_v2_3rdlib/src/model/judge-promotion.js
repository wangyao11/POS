function PromotionUtil(){

}
PromotionUtil.prototype.judgeCartItem = function(cartItem){
  var promotions = Promotion.all();
  var _this = this;
  var type = this.getPromotionType(cartItem);
  if (type === 'BUY_TWO_GET_ONE_FREE') {

    cartItem.getPromotionCount(cartItem.count / 3);

    }

};

PromotionUtil.prototype.getPromotionType = function(cartItem) {
  var promotions = Promotion.all();
  var _this = this;
  var type = '';
  _.forEach(promotions, function(promotion){
    var promotionBarcode = _.find(promotion.barcodes, function(promotionBarcode) {
      return promotionBarcode === cartItem.item.barcode;
    });
    if(promotionBarcode) {
      type =  promotion.type;
    }
  });
  return type;
};
