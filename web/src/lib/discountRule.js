//import database from "./database.json";

var secondSameHalf = createRule(
  "__same",
  [0, 0.5],
  2,
  2,
  true,
  "secondSameHalf"
); // All pair of order with same ID will be discount for 0% and 50%
var moreThenThreeAny = createRule(
  "__any",
  [5],
  3,
  -1,
  false,
  "moreThenThreeAny"
); // If there are more then 3 orders with any ID, all orders will be discount for 5
var normalCheck = createRule("__any", [0], 1, -1, false, ""); // If there are more then 1 orders with any ID, all order will be discount for 0%
var database;

const rules = [secondSameHalf, moreThenThreeAny, normalCheck];
export const checkout = (productIDs = [], db) => {
  console.log("checkout", productIDs, db);
  database = db;
  // Please complete your code here.
  // Product's detail can be found in `database`.
  let arr = [];
  productIDs.forEach((id) => {
    let obj = {
      id: id,
      salePrice: -1,
      hitRule: ""
    };
    arr.push(obj);
  });

  let orderData = {
    list: arr,
    total: 0
  };
  console.log("orderData", orderData);
  rules.forEach((rule) => rule.apply(orderData));

  return orderData;
};

/**
 * Returns a rule function which bind a orderData object
 *
 * @param {string} matchType Define what ondition to apply this rule, can be "__same", "__any", or product ID. e.g. "003"
 * @param {array} discountValues An array of numbers; The discount that will apply on n-th matched order. Value >= 1 means the price will minus the value, Value < 1 means value% off
 * @param {number} minAvaliableNum The rule will apply on the oreders since the number of match is more then this value. Should be more then 1.
 * @param {number} maxAvaliableNum The maximum number of order the rule will apply. If this value is more then the length of discountValues, last discount in discountValues will be applied repeatly.
 *                                 If set to -1, this rule will apply on all matched order.
 * @param {boolean} repeatable Once the matched order is more then maxAvaliableNum, the discountValues will start over on the rest matcted orders
 * @param {string} description description of rule

 */
function createRule(
  matchType,
  discountValues,
  minAvaliableNum,
  maxAvaliableNum,
  repeatable = false,
  description = ""
) {
  if (
    typeof matchType !== "string" ||
    !checkDiscountRule(discountValues) ||
    !checkAvaliableNum(discountValues, minAvaliableNum, maxAvaliableNum) ||
    typeof repeatable !== "boolean"
  ) {
    return function () {
      console.log("invalid argument");
    };
  }

  let buildIndex = getIndexFunc(matchType);

  return function () {
    let index = {};

    // build index for matched orders
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].salePrice > -1) continue;

      buildIndex(index, this.list[i].id, i);
    }
    console.log("buildIndex", index);

    // apply discount rule on index
    for (let key in index) {
      if (index[key].length < minAvaliableNum) continue;

      let rp = 0;
      let lastDiscountRule = discountValues.slice(-1)[0];

      if (maxAvaliableNum === -1) {
        rp = index[key].length;
      } else if (repeatable) {
        rp = index[key].length - (index[key].length % maxAvaliableNum);
      } else {
        rp = maxAvaliableNum;
      }

      for (let i = 0; i < rp; i++) {
        let oper =
          i % maxAvaliableNum >= discountValues.length
            ? lastDiscountRule
            : discountValues[i % maxAvaliableNum];
        let idx = index[key][i];

        this.list[idx].salePrice = getDiscountedPrice(
          getPrice(this.list[idx].id),
          oper
        );

        if (this.list[idx].salePrice !== database[this.list[idx].id].price) {
          this.list[idx].hitRule = description;
        } else {
          this.list[idx].hitRule = "";
        }
        this.total += this.list[idx].salePrice;
      }
    }
  };

  function checkDiscountRule(discountValues) {
    if (!Array.isArray(discountValues) || discountValues.length === 0)
      return false;

    let flag = true;
    discountValues.forEach((n) => {
      if (typeof n !== "number" || n < 0) {
        flag = false;
      }
    });

    return flag;
  }

  function checkAvaliableNum(discountValues, minAvaliableNum, maxAvaliableNum) {
    if (
      !Number.isInteger(minAvaliableNum) ||
      !Number.isInteger(maxAvaliableNum) ||
      discountValues.length > minAvaliableNum
    ) {
      return false;
    }

    return true;
  }

  function getIndexFunc(matchType) {
    let func;

    switch (matchType) {
      case "__same":
        func = function (index, value, idx) {
          if (typeof index[value] === "undefined") {
            index[value] = [idx];
          } else {
            index[value].push(idx);
          }
        };

        break;
      case "__any":
        func = function (index, value, idx) {
          if (typeof index["all"] === "undefined") {
            index["all"] = [idx];
          } else {
            index["all"].push(idx);
          }
        };

        break;
      default:
        func = function (index, value, idx) {
          if (typeof index[matchType] === "undefined") {
            index[matchType] = [idx];
          } else {
            index[matchType].push(idx);
          }
        };

        break;
    }

    return func;
  }

  function getDiscountedPrice(value, param) {
    if (value <= 0) return 0;

    let result = 0;

    if (param >= 1) {
      result = value - param;
    } else if (param < 1) {
      result = value * (1 - param);
    }

    return result >= 0 ? result : 0;
  }
}

function getPrice(id) {
  if (
    database[id] &&
    typeof database[id].price === "number" &&
    database[id].price >= 0
  ) {
    return database[id].price;
  }

  return 0;
}
