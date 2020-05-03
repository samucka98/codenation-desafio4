
function filterProducById(id, productsList) {
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      return {
        name: productsList[i].name,
        category: productsList[i].category
      }
    }
  }
}

function arrayOfProducts(ids, productsList) {
  let list = [];

  for (let i = 0; i < ids.length; i++) {
    list.push(filterProducById(ids[i], productsList));
  }

  return list;
}

function definePromotion(ids, productsList) {
  const looks = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
  const category = ['T-SHIRTS', 'PANTS', 'SHOES', 'BAGS'];

  const listOfProducts = arrayOfProducts(ids, productsList);

  let quantity = [];
  for (let i = 0; i < listOfProducts.length; i++) {
    for (let j = 0; j < category.length; j++) {
      if (listOfProducts[i].category === category[j]) {
        if (quantity.length === 0) {
          quantity.push(category[j]);
        } else {

          let count = 0;
          for (let x = 0; x < quantity.length; x++) {
            if (quantity[x] === category[j]) {
              ++count;
            }
          }

          if (count === 0) {
            quantity.push(category[j]);
          }
        }
      }
    }
  }

  return looks[quantity.length - 1];
}

function defineTotalPrice(ids, productsList) {

  const look = definePromotion(ids, productsList);

  let totalPrice = 0;

  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < productsList.length; j++) {

      if (productsList[j].id === ids[i]) {

        let flag = 0;
        for (let x = 0; x < productsList[j].promotions.length; x++) {
          for (let y = 0; y < productsList[j].promotions[x].looks.length; y++) {

            if (productsList[j].promotions[x].looks[y] === look) {
              totalPrice += productsList[j].promotions[x].price;
              flag = 1;
            }
          }
        }

        if (flag === 0) {
          totalPrice += productsList[j].regularPrice;
        }
      }
    }
  }

  return totalPrice;
}

function getTotalValue(ids, productsList) {

  let totalValue = 0;

  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < productsList.length; j++) {

      if (productsList[j].id === ids[i]) {

        totalValue += productsList[j].regularPrice;
      }
    }
  }

  return totalValue;
}

function getDiscountValue(ids, productsList) {
  const total = getTotalValue(ids, productsList);
  const price = defineTotalPrice(ids, productsList);
  return total - price;
}

function getDiscountPercentage(ids, productsList) {
  const total = getTotalValue(ids, productsList);
  const price = defineTotalPrice(ids, productsList);

  let discount = (((price * 100) / total) - 100) * (-1);

  return discount;
}

function getShoppingCart(ids, productsList) {
  return {
    products: arrayOfProducts(ids, productsList),
    promotion: definePromotion(ids, productsList),
    totalPrice: defineTotalPrice(ids, productsList).toFixed(2),
    discountValue: getDiscountValue(ids, productsList).toFixed(2),
    discount: getDiscountPercentage(ids, productsList).toFixed(2) + '%'
  };
}

module.exports = {
  filterProducById,
  arrayOfProducts,
  definePromotion,
  defineTotalPrice,
  getTotalValue,
  getDiscountValue,
  getDiscountPercentage,
  getShoppingCart
}