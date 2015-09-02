'use strict';

angular.module('VGG')

  .controller('MainController', function($rootScope, $state, $window, $modal, $scope, Comercio, Categoria  ) {

    var entered = $window.sessionStorage['entered'];

    if (!entered) {

      $modal.open({

        templateUrl: 'views/like.html',
        size: 'md',
        controller: function($scope) {

          $scope.message = "Seguinos en facebook!";

          $scope.seguir = function() {

            $window.sessionStorage['entered'] = true;
            $scope.$close();

          };

        }

      });

    }

    $scope.rubros = [];

    Categoria.find(function(data) {

      $scope.rubros = data;

    });

    $scope.comercios = [];

    function shuffle(array) {

      var currentIndex = array.length, temporaryValue, randomIndex ;

        while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

      }

      return array;

    }

    Comercio.find(function(data) {

      $scope.comercios = shuffle(data);

      console.log($scope.comercios);

    });

    $scope.buscar = function() {

      var query = $scope.consulta.toLowerCase();

      var nameQuery = $scope.consulta.toUpperCase();

      console.log(query);

      Comercio.find({

        filter: {

          where: {

            or:

              [

                {

                  nombre: {

                    like: nameQuery + "%"

                  }

                },

                {

                  _descripcion: {

                    like: query + "%"

                  }

                },

                {

                  _promocion: {

                    like: query + "%"

                  }

                }

              ]

          }

        }

      }, function(data) {

        $scope.resultados = data;

        console.log($scope.resultados);

        $state.go('app.busqueda', {
          params: {
            consulta: $scope.consulta
          }
        });

      }, function(err) {

        console.log(err);

      });

    }

  })

  .controller('AdminController', function($scope) {


  })

  .controller('ComercioController', function($scope, $http, $stateParams, Comercio, Categoria, Mail) {

    if ($stateParams.rubroId) {

      $scope.rubro = Categoria.findById({id: $stateParams.rubroId});

      $scope.resultados = [];

      Comercio.find({
        filter: {
          where: {
            categoriaId: $stateParams.rubroId
          }
        }
      }, function(data) {

        $scope.resultados = data;

      });

    }

    if ($stateParams.comercioId) {

      $scope.comercio = [];

      Comercio.findById({

        id: $stateParams.comercioId

      }, function(comercio) {

        $scope.comercio = comercio;
        console.log($scope.comercio);

      }, function(err) {

        console.log(err);

      });

      $scope.rubro = undefined;

      Categoria.findOne({
        filter: {
          where: {
            id: $scope.comercio.categoriaId
          }
        }
      }, function(rubro) {

        $scope.rubro = rubro;

      });

    } else {

      $scope.visitante = undefined;

      $scope.comercio = {

        nombre: "",
        categoria: "",

        direccion: "",
        horarios: "",
        telefono: "",
        email: "",
        pagina: "",

        descripcion: "",
        promocion: "",

        imagenComercio: "",
        imagenes: []

      };

    }

    $scope.rubros = [];

    function cargarCategorias() {

      Categoria.find(

        function(data) {

          $scope.rubros = data;

        }

      );

    }

    cargarCategorias();

    $scope.agregarComercio = function() {

      Comercio.create({

        nombre: $scope.comercio.nombre,
        categoriaId: $scope.comercio.categoriaId,

        direccion: $scope.comercio.direccion,
        telefono: $scope.comercio.telefono,
        horarios: $scope.comercio.horarios,
        email: $scope.comercio.email,
        pagina: $scope.comercio.pagina,

        descripcion: $scope.comercio.descripcion,
        promocion: $scope.comercio.promocion,

        imagenComercio: $scope.file[0].name,
        imagenes: $scope.files

      }, function(comercio) {

        console.log(comercio);
        upload();

      }, function(error) {

        console.log(error);

      });

    };

   $scope.enviarEmail = function() {

     Mail.sendMail({
         data: {
           nombre: $scope.visitante.nombre,
           email: $scope.visitante.email,
           text: $scope.visitante.query
         }
       },
       function(data) {
         console.log(1, data.message);
       },
       function(err) {
         console.log(2, err);
       }
     );

   };

   // upload private method
   var upload = function() {

      var fd = new FormData();

      angular.forEach($scope.file, function(file) {
        fd.append('file', file);
      });

      angular.forEach($scope.slider, function(file) {
        fd.append('file', file);
      });

     console.log($scope.slider);

     console.log(fd);

      $http.post('/api/containers/images/upload',
        fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }
      ).success(function(d){
          console.log(d);
          console.log($scope.files);
        })
        .error(function(e) {
          console.log(e);
        });
    };

  // get categoryId
  $('#rubros').on('input', function() {

    var x = $('#rubros').val();
    var z = $('#rubro');

    var val = $(z).find('option[value="' + x + '"]');
    var endVal = val.attr('id');

    console.log(endVal);
    $scope.comercio.categoriaId = endVal;

  });


  // tinyMCE options
  $scope.tinyMCEOptions = {
    onChange: function(e) {

    },
    inline: false,
    plugins : 'advlist autolink link image lists charmap print preview',
    skin: 'lightgray',
    theme : 'modern'
  };

});
