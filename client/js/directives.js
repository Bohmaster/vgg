'use strict';

angular
  .module('VGG')
  .directive('fileInput', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.bind('change', function() {

          $parse(attrs.fileInput)
            .assign(scope, elm[0].files);
          scope.$apply();

          console.log(scope.file[0].name);

        });

      }
    }
  })
  .directive('filesInput', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.bind('change', function() {

          var files = [];
          var filesArray = elm[0].files;

          scope.slider = filesArray;

          console.log(filesArray);

          for (var key in filesArray) {

            var obj = filesArray[key];

            files.push(obj.name);

          }

          var newFiles = files.slice(0, filesArray.length);

          $parse(attrs.filesInput)
            .assign(scope, newFiles);
          scope.$apply();

        });

      }
    }
  })
  .directive('compile', function($compile) {
    return {
      restrict: 'A',
      scope: {
        data: '@compile'
      },
      compile: function(elem, attrs) {

        var x = attrs.compile;
        var y = "<span>" + x + "</span>";

        attrs.compile = y;

        return function postLink(scope, elem, attrs) {

          var linkFn = $compile(scope.data);
          var content = linkFn(scope);
          elem.append(content);

        }
      }

    }
  })
  .directive('mapa', function($compile) {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {

          var html = '<iframe width="450" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + scope.comercio.direccionMapa + '%20Galvez&key=AIzaSyAelQR2x4P2Md932GBR3txgmsE35S0ZSuU" allowfullscreen></iframe>';

          var linkFn = $compile(html);
          var content = linkFn(scope);
          elem.append(content);

        }
    }
  });
