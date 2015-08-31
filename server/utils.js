var exports = module.exports = {};

exports.formatAccentsAndSpaces = function(str) {

  str = str.replace(/[á]/g,"a");
  str = str.replace(/[é]/g,"e");
  str = str.replace(/[í]/g,"i");
  str = str.replace(/[ó]/g,"o");
  str = str.replace(/[ú]/g,"u");

  str = str.replace(/\s/g, '%20');

  return str;

};
