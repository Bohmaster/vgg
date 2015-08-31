module.exports = function(Categoria) {

  Categoria.observe('before save', function setRubro (ctx, next) {

    next();

  });

};
