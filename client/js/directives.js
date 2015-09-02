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
      compile: function(elem, attrs) {

        var x = attrs.compile;
        var y = "<span>" + x + "</span>";

        attrs.compile = y;

        return function postLink(scope, elem, attrs) {

          attrs.$observe('compile', function(value) {

            console.log(value);

            var linkFn = $compile(value);
            var content = linkFn(scope);
            elem.append(content);

          });

        }
      }

    }
  })
  .directive('mapa', function($interpolate) {
    return {
      restrict: 'E',
      template: '<div id="map" style="width: 100%; height: 350px;"></div>',
      link: function(scope, elem, attrs) {

        var geocoder;
        var map;

          attrs.$observe('dir', function(value) {

            geocoder = new google.maps.Geocoder();

            geocoder.geocode( { 'address': value}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {

                var mapOptions = {
                  zoom: 17,
                  center: results[0].geometry.location
                };

                map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
                });

              } else {

                console.log(status);

              }

            });

          });

        }
      }
    }
  );
