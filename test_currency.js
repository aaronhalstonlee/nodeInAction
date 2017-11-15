const currency = require('./currency');
console.log('50 Canadian dollars = this in US:');
console.log(currency.canadianToUs(50));
console.log('50 US = this in CAN:');
console.log(currency.USToCanadian(50));