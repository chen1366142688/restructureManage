
const ENV = ''; //dev   pro
const ADDRESS = !ENV || ENV === 'dev' ? 'dev' : 'pro';
module.exports = ADDRESS;