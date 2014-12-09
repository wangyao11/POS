function Items(count) {
  this.count = count;
}
Items.prototype = Object.create(item.prototype);
Items.prototype.constructor = Items;

Items.prototype.getCartItem = function(){

}
