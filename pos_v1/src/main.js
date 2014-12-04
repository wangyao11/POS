
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
    if (tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }

    var cartItem = findCartItem(barcode,cartItems);
    if (cartItem) {
      cartItem.count += count;
    } else {
      var item = findItem(barcode,loadAllItems());
      cartItems.push({item : item, count : count});

    }
  }
  return cartItems;
}

function findCartItem(barcode,cartItems){
  var cartItem ;
  for(var i = 0; i < cartItems.length;i++){
    if (barcode === cartItems[i].item.barcode) {
      cartItem = cartItems[i];
    }
  }
  return cartItem;
}

function findItem(barcode,allItems){
  var item ;

  for(var i = 0; i < allItems.length;i++){
    if (barcode === allItems[i].barcode) {
      item = allItems[i];
    }
  }
  return item;
}

function getInventoryText(cartItems){

  var globalPromotion = getGlobalPromotion(cartItems);
  console.log(globalPromotion);


  inventoryText = '***<没钱赚商店>购物清单***\n';
  inventoryText += getCartItemsText(cartItems);
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += getPromotionsText(globalPromotion);
  inventoryText += '----------------------\n' ;

  var totalPrices = getTotalPrices(cartItems);

  var promotionPrice = getPromotionPrice(globalPromotion);

  var total = getTotal(totalPrices,promotionPrice);

  inventoryText += '总计：' + total.toFixed(2) + '(元)\n' ;
  inventoryText += '节省：' + promotionPrice.toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';


  return inventoryText;
}

function getGlobalPromotion(cartItems){
  var globalPromotion = [];
  for(var i = 0; i < cartItems.length;i++){
    var promotions = loadPromotions();
    var cartItem = cartItems[i];

    var promotion = findPromotion(promotions, 'BUY_TWO_GET_ONE_FREE');
    if( promotion ){

      var promotionBarcode = findPromotionBarcode(promotion,cartItem);

      if (promotionBarcode) {
        globalPromotion.push({
          name : cartItem.item.name,
          number : parseInt(cartItem.count / 3),
          unit : cartItem.item.unit,
          price:cartItem.item.price});
        }
      }
  }
  return globalPromotion;
}
function getPromotionPrice(globalPromotion){
  var promotionPrice = 0;
  for(var i = 0; i < globalPromotion.length; i++){
    promotionPrice += globalPromotion[i].number * globalPromotion[i].price;

  }
  return promotionPrice;
}

function getTotalPrices(cartItems){
  var totalPrices = 0;

  for(var i = 0; i < cartItems.length;i++){
    var cartItem = cartItems[i];
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    totalPrices += count*price;

  }

  return totalPrices;
}

function getTotal(totalPrices,promotionPrice){
   return totalPrices - promotionPrice;
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

    var subtotal = promotionCount > 0 ? paymentCount * price
                  : count * price;

    text += '名称：' + item.name +
      '，数量：' + count + item.unit +
      '，单价：' + price.toFixed(2) +
      '(元)，小计：'+ subtotal.toFixed(2) + '(元)\n';

  }
  return text;
}

function getPromotionsText(globalPromotion){
  var text = '';
  for(var i = 0; i < globalPromotion.length; i++){
    text += '名称：'+globalPromotion[i].name +
      '，数量：'+globalPromotion[i].number+ globalPromotion[i].unit + '\n';
  }
  return text;
}

function getPromotionCount(cartItem,globalPromotion){
  var promotionCount = 0;

  var promotions = loadPromotions();

  var promotion = findPromotion(promotions, 'BUY_TWO_GET_ONE_FREE');
  if( promotion ){

    var promotionBarcode = findPromotionBarcode(promotion,cartItem);

      if (promotionBarcode) {

        return parseInt(cartItem.count / 3);
      }
  }
  return promotionCount;
}

function findPromotion(promotions, type){
  var promotion;

  for(var i = 0; i < promotions.length; i++) {
    if (promotions[i].type === type) {
      promotion = promotions[i];
    }
  }

  return promotion;
}

function findPromotionBarcode(promotion,cartItem){
  var promotionBarcode;

  for(var i = 0; i < promotion.barcodes.length; i++) {
    if (promotion.barcodes[i] === cartItem.item.barcode) {
      promotionBarcode = promotion.barcodes[i];
    }
  }

  return promotionBarcode;
}
