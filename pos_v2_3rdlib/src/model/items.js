function Items(barcode, name, unit, price,count) {
  Item.call(this,barcode, name, unit, price);
  this.count = count;
}
Items.prototype = Object.create(item.prototype);
Items.prototype.constructor = Items;
