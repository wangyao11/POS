function PromotionItem(name, unit, count, price){
  Item.call(this,name,unit);
  this.promotionCount = count;
  this.promotionPrice = price;
}

PromotionItem.prototype = Object.create(Item.prototype);
PromotionItem.prototype.constructor = PromotionItem;
