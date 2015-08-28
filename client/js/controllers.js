'use strict';

angular.module('VGG')
  .controller('MainController', function($rootScope, $scope, Mail) {

    Mail.sendMail({
      data: {
        text: "sabe"
      }
    },
      function(data) {
        console.log(data.message);
      },
      function(err) {
        console.log(err);
      }
    );

  })
  .controller('AdminController', function($scope) {



  })
  .controller('ComercioController', function($scope, $http, Comercio, Categoria) {

    $scope.comercio = {

      nombre: "",
      categoria: "",

      direccion: "",
      telefono: "",
      email: "",

      descripcion: "",
      promocion: "",

      imagenComercio: "",
      imagenes: ""

    };

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
        telefono: $scope.comercio.telfono,
        email: $scope.comercio.email,
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


  $('#rubros').on('input', function() {

    var x = $('#rubros').val();
    var z = $('#rubro');

    var val = $(z).find('option[value="' + x + '"]');
    var endVal = val.attr('id');

    console.log(endVal);
    $scope.comercio.categoriaId = endVal;

  });
});
