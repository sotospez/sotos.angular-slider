/**
 * Created by sotiris on 22/4/2015.
 */


sotosAngularSlider.directive('resize',['$window', function ($window) {
    return {
        scope:true,
        link:    function (scope, element,attrs) {
            var w = angular.element($window);
            var el = angular.element(element);

            scope.style = function (size) {
                size= size||0;
                var width= '100%';
                var height= Math.round(w[0].innerHeight-size)+'px';
                return {
                    'height': height,
                    'width': width
                };
            };

            w.bind('resize', function () {
            scope.$apply();
            });

        }

    };
}]);
