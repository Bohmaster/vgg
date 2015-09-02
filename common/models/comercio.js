module.exports = function(Comercio) {

  Comercio.observe('before save', function(ctx, next) {

    var _descripcion = ctx.instance.descripcion.toLowerCase();
    var _promocion = ctx.instance.promocion.toLowerCase();

    ctx.instance._descripcion = _descripcion;
    ctx.instance._promocion = _promocion;

    next();

  });

};
