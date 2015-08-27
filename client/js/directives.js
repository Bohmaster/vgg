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
  });
