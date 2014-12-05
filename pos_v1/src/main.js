
function printInventory(tags){
  var cartItems = getCartItems(tags);

  var inventoryText = getInventoryText(cartItems);

  console.log(inventoryText);
}

function getCartItems(tags){
  var cartItems = [];
  var allItems = loadAllItems();
  _.forEach(tags, function(tag){
    var tagArray = tag.split("-");
    var barcode = tagArray[0];
    var count = 1;
    if (tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }

    var cartItem = _.find(cartItems, function(cartItem){
      return barcode === cartItem.item.barcode;
    });
    if (cartItem) {
      cartItem.count += count;
    } else {
      var item = _.find(allItems, function(item){
        return barcode === item.barcode;
      });
      cartItems.push({item : item, count : count});
    }
  });
  return cartItems;
}

function getInventoryText(cartItems){

  var globalPromotions = getGlobalPromotions(cartItems);

  inventoryText = '***<没钱赚商店>购物清单***\n';
  inventoryText += getCartItemsText(cartItems,globalPromotions);
  inventoryText += '----------------------\n';
  inventoryText += '挥泪赠送商品：\n';
  inventoryText += getPromotionsText(globalPromotions);
  inventoryText += '----------------------\n' ;

  var totalPrices = getTotalPrices(cartItems);

  var promotionPrice = getPromotionPrice(globalPromotions);

  inventoryText += '总计：' + (totalPrices - promotionPrice).toFixed(2) + '(元)\n';
  inventoryText += '节省：' + promotionPrice.toFixed(2) + '(元)\n' ;
  inventoryText += '**********************';


  return inventoryText;
}

function getGlobalPromotions(cartItems){
  var globalPromotions = [];

  _.forEach(cartItems,function(cartItem){
    var promotions = loadPromotions();
    var promotion = _.find(promotions,{type:'BUY_TWO_GET_ONE_FREE'});

    var promotionBarcode = _.find(promotion.barcodes,function(promotionBarcode){
      return promotionBarcode === cartItem.item.barcode;
     });

    if (promotionBarcode) {
      globalPromotions.push({
        name : cartItem.item.name,
        number : parseInt(cartItem.count / 3),
        unit : cartItem.item.unit,
        price:cartItem.item.price});
    }
  });
  return globalPromotions;
}
function getPromotionPrice(globalPromotions){
  var promotionPrice = 0;
  _.forEach(globalPromotions, function(globalPromotion){
    promotionPrice += globalPromotion.number * globalPromotion.price;
  });

  return promotionPrice;
}

function getTotalPrices(cartItems){
  var totalPrices = 0;
  _.forEach(cartItems,function(cartItem){
    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    totalPrices += count*price;
  });

  return totalPrices;
}

function getCartItemsText(cartItems,globalPromotions){
  var text = '';
  _.forEach(cartItems, function(cartItem){

    var item = cartItem.item;
    var count = cartItem.count;
    var price = item.price;

    var promotionCount = getPromotionCount(cartItem,globalPromotions);
    var paymentCount = count - promotionCount;

    var subtotal = promotionCount > 0 ? paymentCount * price
    : count * price;

    text += '名称：' + item.name +
    '，数量：' + count + item.unit +
    '，单价：' + price.toFixed(2) +
    '(元)，小计：'+ subtotal.toFixed(2) + '(元)\n';

  });
  return text;
}

function getPromotionsText(globalPromotions){
  var text = '';
  for(var i = 0; i < globalPromotions.length; i++){
    text += '名称：'+globalPromotions[i].name +
      '，数量：'+globalPromotions[i].number+ globalPromotions[i].unit + '\n';
  }
  return text;
}

function getPromotionCount(cartItem,globalPromotions){
  var promotionCount = 0;
  _.forEach(globalPromotions,function(globalPromotion){
    if(globalPromotion.name === cartItem.item.name){
      promotionCount = globalPromotion.number;
    }
  });

  return promotionCount;
}
