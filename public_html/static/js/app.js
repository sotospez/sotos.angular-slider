/**
 * Created by sotiris on 22/4/2015.
 */



var app = angular.module('app', ['ngAnimate','sotos-angular-slider','ngSanitize']);

app.controller('mainCtrl',[ '$scope','$sce',
    function ($scope,$sce) {
        $scope.offsetTop=0;

        $scope.images=[];

        $scope.images.images1=[];
        $scope.images.images2=[];
        $scope.images.images3=[];
        $scope.images.images4=[];
        $scope.images.images5=[];
        $scope.images.images6=[];
        $scope.images.images7=[];
        $scope.htmlTitle = '<h1>Angular Slider</h1>';
        $scope.htmlDescr = '<p>slide up down - left right</p>';
        $scope.htmlTitle1 = '<h2>find on github</h2>';
        $scope.htmlDescr1 = '<p>github/sotospez</p>';

        $scope.trustedTitle = $sce.trustAsHtml($scope.htmlTitle);
        $scope.trustedDescr = $sce.trustAsHtml($scope.htmlDescr);

        $scope.trustedTitle1 = $sce.trustAsHtml($scope.htmlTitle1);
        $scope.trustedDescr1 = $sce.trustAsHtml($scope.htmlDescr1);

        $scope.images.images1.push({url:'img/1/01.jpg',title: $scope.trustedTitle,description:$scope.htmlDescr });
        $scope.images.images1.push({url:'img/1/02.jpg'});
        $scope.images.images1.push({url:'img/1/03.jpg'});
        $scope.images.images1.push({url:'img/1/04.jpg'});
        $scope.images.images1.push({url:'img/1/05.jpg'});

        $scope.images.images2.push({url:'img/2/01.jpg',title: $scope.trustedTitle1,description:$scope.htmlDescr1 });

        $scope.images.images3.push({url:'img/3/01.jpg'});
        $scope.images.images3.push({url:'img/3/02.jpg'});
        $scope.images.images3.push({url:'img/3/03.jpg'});
        $scope.images.images3.push({url:'img/3/04.jpg'});
        $scope.images.images3.push({url:'img/3/05.jpg'});
        $scope.images.images3.push({url:'img/3/06.jpg'});
        $scope.images.images3.push({url:'img/3/07.jpg'});
        $scope.images.images3.push({url:'img/3/08.jpg'});
        $scope.images.images3.push({url:'img/3/09.jpg'});
        $scope.images.images3.push({url:'img/3/10.jpg'});
        $scope.images.images3.push({url:'img/3/11.jpg'});
        $scope.images.images3.push({url:'img/3/12.jpg'});
        $scope.images.images3.push({url:'img/3/13.jpg'});
        $scope.images.images3.push({url:'img/3/14.jpg'});
        $scope.images.images3.push({url:'img/3/15.jpg'});
        $scope.images.images3.push({url:'img/3/16.jpg'});
        $scope.images.images3.push({url:'img/3/17.jpg'});

        $scope.images.images4.push({url:'img/4/01.jpg'});
        $scope.images.images4.push({url:'img/4/02.jpg'});
        $scope.images.images4.push({url:'img/4/03.jpg'});

        $scope.images.images5.push({url:'img/5/01.jpg'});
        $scope.images.images5.push({url:'img/5/02.jpg'});
        $scope.images.images5.push({url:'img/5/03.jpg'});
        $scope.images.images5.push({url:'img/5/04.jpg'});
        $scope.images.images5.push({url:'img/5/05.jpg'});
        $scope.images.images5.push({url:'img/5/06.jpg'});
        $scope.images.images5.push({url:'img/5/07.jpg'});
        $scope.images.images5.push({url:'img/5/08.jpg'});
        $scope.images.images5.push({url:'img/5/09.jpg'});
        $scope.images.images5.push({url:'img/5/10.jpg'});
        $scope.images.images5.push({url:'img/5/11.jpg'});
        $scope.images.images5.push({url:'img/5/12.jpg'});
        $scope.images.images5.push({url:'img/5/13.jpg'});

        $scope.images.images6.push({url:'img/6/01.jpg'});
        $scope.images.images6.push({url:'img/6/02.jpg'});
        $scope.images.images6.push({url:'img/6/03.jpg'});
        $scope.images.images6.push({url:'img/6/04.jpg'});
        $scope.images.images6.push({url:'img/6/05.jpg'});
        $scope.images.images6.push({url:'img/6/06.jpg'});





    }]);







//-----angular start

angular.element(window).ready(function() {
    angular.bootstrap(document, [ "app" ]);

});
