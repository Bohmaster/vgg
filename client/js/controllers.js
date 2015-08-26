'use strict';

angular.module('VGG')
  .controller('MainController', function($rootScope, $scope) {

    $rootScope.greet = "Hello!";

  })
  .controller('AdminController', function($scope) {



  })
  .controller('ComercioController', function($scope, Comercio) {

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

    }

  });
