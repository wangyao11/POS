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

  var globalPromotions = [];

  inventoryText = '***<没钱赚商店>购物清单***\n'
  inventoryText += getCartItemsText(globalPromotions, cartItems);
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += getPromotionsText(globalPromotions);
  inventoryText += '----------------------\n' ;
  inventoryText += '总计：' + getTotalAmount(globalPromotions, cartItems).toFixed(2) + '(元)\n' ;
  inventoryText += '节省：' + getPromotionTotalAmount(globalPromotions, cartItems).toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';


  return inventoryText;
}

function getTotalAmount(globalPromotions, cartItems) {
  var totalAmount = 0;

  for(var i = 0; i < cartItems.length; i++) {
    var promotionCount = getPromotionCount(globalPromotions, cartItems[i]);

    totalAmount += getSubTotal(promotionCount, cartItems[i]);
  }

  return totalAmount;
}

function getPromotionTotalAmount(globalPromotions, cartItems) {
  var totalAmount = 0;

  for(var i = 0; i < cartItems.length; i++) {
    var promotionCount = getPromotionCount(globalPromotions, cartItems[i]);

    totalAmount += getPromotionPrice(promotionCount, cartItems[i]);
  }

  return totalAmount;
}

function getCartItemsText(globalPromotions, cartItems){
  var text = '';

  for(var i = 0; i < cartItems.length; i++){

    var cartItem = cartItems[i];
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    var promotionCount = getPromotionCount(globalPromotions, cartItem);

    var subtotal = getSubTotal(promotionCount, cartItem);

    text += '名称：' + item.name +
      '，数量：' + count + item.unit +
      '，单价：' + price.toFixed(2) +
      '(元)，小计：'+ subtotal.toFixed(2) + '(元)\n';
  }

  return text;
}

function getPromotionPrice(promotionCount, cartItem) {
  var promotionPrice = 0;

  if (promotionCount > 0) {
    promotionPrice = promotionCount * cartItem.item.price;
  }

  return promotionPrice;
}

function getSubTotal(promotionCount, cartItem) {

  var item = cartItem.item;
  var count = cartItem.count;
  var price = item.price;

  var paymentCount = count - promotionCount;

  var subtotal = promotionCount > 0
    ? paymentCount * price
    : count * price;

  return subtotal;
}

function getPromotionsText(globalPromotions){
  var text = '';

  for(var i = 0; i < globalPromotions.length; i++){
    text += '名称：'+ globalPromotions[i].name +
      '，数量：' + globalPromotions[i].number + globalPromotions[i].unit + '\n';
  }

  return text;
}
function getPromotionCount(globalPromotions, cartItem){
  var promotionCount = 0;

  var promotions = loadPromotions();

  var promotion = findPromotion(promotions, 'BUY_TWO_GET_ONE_FREE');
  if (promotion) {
    for(var i = 0; i < promotion.barcodes.length; i++){
      if (promotion.barcodes[i] === cartItem.item.barcode) {
        globalPromotions.push({
          name : cartItem.item.name,
          number : parseInt(cartItem.count / 3),
          unit : cartItem.item.unit
        });

        return parseInt(cartItem.count / 3);
      }
    }
  }

  return promotionCount;
}

function findPromotion(promotions, type) {
  var promotion;

  for(var i = 0; i < promotions.length; i++) {
    if (promotions[i].type === type) {
      promotion = promotions[i];
    }
  }

  return promotion;
}
