var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function (cash) {

  return cash.amount > 100000;
})



// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances.map(function (cash) {
  return Number(cash.amount);
}).reduce(function (a, b) {
  // previous = parseInt(a); // Why does setting the return of the map function to Number(cash.amount work while converting previous/current to numbers using parseint doesnt?
  // current = parseInt(b);
  a += b;
  return a
})

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = dataset.bankBalances.filter(function (element) {
  if (element.state === 'WI' || element.state === 'IL' || element.state === 'WY' || element.state === 'OH' || element.state === 'GA' || element.state === 'DE') {
    return true
  }
}).map(function (element) {
  let money = Math.round(Number(element.amount * .189));
  return money;
}).reduce(function (a, b) {
  a += b;
  return a
})

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = dataset.bankBalances.reduce(function (previousValue, currentValue) {
  if (!previousValue.hasOwnProperty(currentValue.state)) {
    previousValue[currentValue.state] = Number(currentValue.amount);
  } else {
    previousValue[currentValue.state] += Math.round(currentValue.amount);
  }
  return previousValue;
}, {})
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
const selectedStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

let statesArr = Object.keys(stateSums);
let totalInterest = 0;

sumOfHighInterests = statesArr.filter(element => !selectedStates.includes(element))

  .map(element => stateSums[element] * 0.189)

  .filter(element => element > 50000)

  .reduce((prev, curr) => {
    totalInterest = prev + parseFloat(curr);
    totalInterest = Math.round(totalInterest)
    return parseFloat(totalInterest.toFixed(0))
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = Object.entries(stateSums).filter(function (element) {
  if (element[1] < 1000000) {
    let lowerNumbers = element[1];
    return lowerNumbers
  }
}).map(function (element) {
  return element[0];
})


/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = Object.entries(stateSums).filter(function (element) {
  if (element[1] > 1000000) {

    return element[1];
  }
}).reduce(function (a, b) {

  return a += b[1];
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */

selectedStates

var areStatesInHigherStateSum = Object.entries(stateSums).filter(function (element) {
  if (selectedStates.includes(element[0])) {
    return element[1];
  }
}).every(function (element) {
  if (element[1] > 2550000) {
    return true
  }
})

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = Object.entries(stateSums).filter(function (element) {
  if (selectedStates.includes(element[0])) {
    return element[1];
  }
}).some(function (element) {
  if (element[1] > 2550000) {
    return true;
  }
})



module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
