var utils = require('../../server/utils.js');

module.exports = function(Comercio) {

  Comercio.observe('before save', function(ctx, next) {

    var Rubro = Comercio.app.models.Categoria;

    Rubro.find({
      filter: {
        where: {
          id: ctx.instance.categoriaId
        }
      }
    }, function(err, rubro) {

      console.log(rubro[0].nombre);
      ctx.instance.rubro = rubro[0].nombre;

      console.log(ctx);
    });

    var result = utils.formatAccentsAndSpaces(ctx.instance.direccion);

    ctx.instance.direccionMapa = result;

    console.log(result);

    next();

  });

};
