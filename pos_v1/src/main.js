
var promotion = [];
var sumPrice = 0;
var promotionPrice = 0;
function printInventory(tags){
  var cartItems = getCartItems(tags);

  var inventoryText = getInventoryText(cartItems);

  console.log(inventoryText);
}

function getCartItems(tags){
  var cartItems = [];
  var allItems = loadAllItems();

  for(var i = 0; i < tags.length; i ++){

    var tagArray = tags[i].split("-");
    var barcode = tagArray[0];
    var count = 1;
    if(tagArray[1]){
      count = parseFloat(tagArray[1]);
    }

    var cartItem = findCartItem(barcode,cartItems);
    if(cartItem) {
      cartItem.count += count;
    }else{
      var item = getItem(barcode,loadAllItems())
      cartItems.push({item : item, count : count});

    }
  }
  return cartItems;
}

function findCartItem(barcode,cartItems){
  var cartItem ;
  for(var i = 0; i < cartItems.length;i++){
    if(barcode === cartItems[i].item.barcode){
       cartItem = cartItems[i];
    }
  }
  return cartItem;
}

function getItem(barcode,allItems){
  var item ;
  for(var i = 0; i < allItems.length;i++){
    if(barcode === allItems[i].barcode ){
      item = allItems[i];
    }
  }
  return item;
}

function getInventoryText(cartItems){

  inventoryText = '***<没钱赚商店>购物清单***\n'
  inventoryText += getCartItemsText(cartItems);
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += getPromotionsText();
  inventoryText += '----------------------\n' ;
  inventoryText += '总计：' + sumPrice.toFixed(2) + '(元)\n' ;
  inventoryText += '节省：' + promotionPrice.toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';


  return inventoryText;
}

function getCartItemsText(cartItems){
  var text = '';

  for(var i = 0; i < cartItems.length;i++){

    var cartItem = cartItems[i];
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    var promotionCount = getPromotionCount(cartItem);

    var paymentCount = count - promotionCount;

    var subtotal = promotionCount > 0
                   ? paymentCount * price
                   : count * price;

    text += '名称：' + item.name +
      '，数量：' + count + item.unit +
      '，单价：' + price.toFixed(2) +
      '(元)，小计：'+ subtotal.toFixed(2) + '(元)\n';

    sumPrice += subtotal;

    if (promotionCount > 0) {
      promotionPrice += promotionCount * price;
    }
  }

  return text;
}

function getPromotionsText(){
  var text = '';
  for(var i = 0; i < promotion.length; i++){
    text += '名称：'+promotion[i].name +
    '，数量：'+promotion[i].number+ promotion[i].unit + '\n';
  }
  return text;
}
function getPromotionCount(cartItem){
  var promotions = loadPromotions();
  for(var i = 0; i < promotions.length; i++){
    for(var j = 0; j < promotions[i].barcodes.length; j++){
      if( promotions[i].barcodes[j] === cartItem.item.barcode && promotions[i].type === 'BUY_TWO_GET_ONE_FREE'){
        promotion.push({name : cartItem.item.name,number : parseInt(cartItem.count/3),unit : cartItem.item.unit});
        return parseInt(cartItem.count/3);
      }
    }
  }
}
