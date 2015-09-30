/**
 * sotos-angular-slider - angular slider
 * @version v0.0.2
 * @author : pezouvanis sotiris 
 * Copyright (c) 30/09/2015
 */


var sotosAngularSlider =  angular.module('sotos-angular-slider', ['ngAnimate','sotos.tmp']);



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

/**
 * Created by sotiris on 22/4/2015.
 */



sotosAngularSlider.directive('sotosSliderUpDown',['$window','$interval','$timeout','$compile',
    function ($window,$interval,$timeout,$compile) {
    return {
        priority: 99,
        restrict: 'A,C',
        transclude: true,
        scope:{
            images:"=",
            offsetTop:'='
        },
        //replace: true,
        templateUrl:'js/slider-up-down.html',
        link:    function (scope, element,attrs,ctrl,transclude) {
                var el = angular.element(element);


         //   var i=1;

            scope.showSlidesUP=1;
          //  scope.show=2;
          //  console.log(el);
            scope.countSlidesUP = 1;
            scope.countSlidesUPArray  = Array( scope.countSlidesUP);
            scope.nextup=false;

            scope.showTheSlideUpDown=function(showSlide){
                if( scope.showSlidesUP>showSlide ){
                    scope.nextup=false;
                }else{
                    scope.nextup=true;
                }
                $timeout(function(){
                    scope.showSlidesUP =showSlide;
                }, 250);

            };




            var upAuto =  function(){
                if(scope.showSlidesUP === scope.countSlidesUP-1){
                   // scope.showTheSlideUpDown(1);
                }else{
                    scope.showTheSlideUpDown(scope.showSlidesUP+1);
                }
            };


            var downAuto =  function(){
                if(scope.showSlidesUP <=1 ){
                    scope.showTheSlideUpDown(1);
                }else{
                    scope.showTheSlideUpDown(scope.showSlidesUP-1);
                }
            };


            //start the slider
           // var stop =  $interval( upAuto, 5000);


            scope.up = function(){
                scope.nextup=true;
             //   $interval.cancel(stop);
                upAuto();
            };
            scope.down = function(){
                scope.nextup=false;
                // $interval.cancel(stop);
                downAuto();

            };



            var scrollEvt = function(evt){
             //   console.log(evt);

                if (evt.deltaY > 0) {
                    scope.up();
                } else{
                    scope.down();

                }


            };


            var touch =0;
            var touchMove =0;

            var touchEvtStart = function(e){
            //    console.log( e.targetTouches[0].pageY);
                touch = e.targetTouches[0].pageY;
                touchMove=0;

            };

            var touchEvt = function(e){
               // console.log( e.targetTouches[0].pageY);
                touchMove  = e.targetTouches[0].pageY;



            };

            var touchEvtEnd = function(e){
             //   console.log( e.targetTouches[0].pageY);
                if( touchMove >50){
              //  console.log(touch- touchMove ,touch, touchMove  );
               if(touch-touchMove >70){
                    scope.up();
                }
                if(touch-touchMove <-70){
                    scope.down();
                }
                }
            };


            var keyDown = function(evt){
                evt = evt || window.event;
               // alert(evt);
                //DOWN
                if (evt.keyCode == 38) {
                    scope.down();
                }

                //UP
                if (evt.keyCode == 40) {
                    scope.up();
                }
            };




            el.bind('mousewheel',scrollEvt);
            el.bind('scroll',scrollEvt);
            el.bind('wheel',scrollEvt);
            el.bind('DOMMouseScroll',scrollEvt);

            el.bind('touchstart',touchEvtStart);
            el.bind('touchmove',touchEvt);
            el.bind('touchend',touchEvtEnd);




           var w = angular.element($window);
           w.bind('keydown',keyDown);


            transclude(scope,function (clone,scope) {
                var i=1;
                angular.forEach(clone,function(cloneOne){
                    if(cloneOne.outerHTML ){
                        var transcluded = angular.element('<div ng-class="{\'slider-up\':nextup,\'slider-down\':!nextup}"  ng-if="showSlidesUP=='+i+'"></div>');
                        transcluded.append(cloneOne.outerHTML);
                        el.children().append($compile(transcluded)(scope));
                        i++;
                    }

                });

                scope.countSlidesUP  =i;
                scope.countSlidesUPArray  = Array( scope.countSlidesUP-1);
            });

        }
    };
}]);

/**
 * Created by sotiris on 22/4/2015.
 */




sotosAngularSlider.directive('sotosSlider',['$window','$interval','$timeout',
    function ($window,$interval,$timeout) {
    return {
        priority: 0,
        restrict: 'A,C',
        scope:{
         images:'=' ,
         offsetTop:'='
        },
        templateUrl:'js/slider.html',
        link:    function (scope, element,attrs) {
                var el = angular.element(element);
            //attrs.offsetTop =attrs.offsetTop||0;
            scope.show=0;
         //   scope.images=scope.images||[];
            scope.count = scope.images.length-1;
            scope.nextimg=false;

            scope.showTheSlide=function(showSlide){
                $timeout(function(){
                    scope.show =showSlide;
                }, 100);

            };




            var nextAuto =  function(){
                if(scope.show === scope.count){
                    scope.showTheSlide(0);
                }else{
                    scope.showTheSlide(scope.show+1);
                }
            };


            var prevAuto =  function(){
                if(scope.show ===0 ){
                    scope.showTheSlide(scope.count);
                }else{
                    scope.showTheSlide(scope.show-1);
                }
            };


            //start the slider
            var stop =  $interval( nextAuto, 4000);


            scope.next = function(){
                scope.nextimg=true;
                $interval.cancel(stop);
                nextAuto();
            };
            scope.prev = function(){
                scope.nextimg=false;
                 $interval.cancel(stop);
                prevAuto();

            };

            var touch =0;
            var touchMove =0;

            var touchEvtStart = function(e){
                //    console.log( e.targetTouches[0].pageY);
                touch = e.targetTouches[0].pageX;
                touchMove=0;

            };

            var touchEvt = function(e){
                // console.log( e.targetTouches[0].pageY);
                touchMove  = e.targetTouches[0].pageX;



            };

            var touchEvtEnd = function(e){
                //   console.log( e.targetTouches[0].pageY);
                if( touchMove >50){
                    //  console.log(touch- touchMove ,touch, touchMove  );

                    if(touch-touchMove >50){
                        scope.next();
                    }
                    if(touch-touchMove <-50){
                        scope.prev();
                    }
                }
            };
            el.bind('touchstart',touchEvtStart);
            el.bind('touchmove',touchEvt);
            el.bind('touchend',touchEvtEnd);


            document.onkeydown = function(evt) {
                evt = evt || window.event;
               //  alert(evt.keyCode);
                //ENTER KEY
                if (evt.keyCode == 27) {
                  //  $scope.modalShow=0;
                }
                //  BACK
                if (evt.keyCode == 37) {
                   scope.prev();
                }
                // NEXT
                if (evt.keyCode == 39) {
                    scope.next();
                }

                scope.$apply();
            };


        }
    };
}]);

angular.module("sotos.tmp", []).run(["$templateCache", function($templateCache) {$templateCache.put("js/slider-up-down.html","<div resize ng-style=\"style(offsetTop)\"><div class=\"slider-up-down-controls\"><div class=\"slider-controls-inner\"><div class=\"slider-controls-inner-btn\"><div class=\"btn-area\" ng-repeat=\"i in countSlidesUPArray track by $index\"><button ng-click=\"showTheSlideUpDown($index+1)\" ng-class=\"{active:($index+1)==showSlidesUP}\">{{$index+1}}</button></div></div></div></div></div>");
$templateCache.put("js/slider.html","<div class=\"slider-main\" resize ng-style=\"style(offsetTop)\"><div class=\"slider-image\" ng-repeat=\"img in images\" ng-if=\"$index == show\" ng-class=\"{\'slider-right\':!nextimg,\'slider-left\':nextimg}\"><div class=\"slider-image-inner\" ng-style=\"{\'background-image\':\'url(\'+img.url+\')\'}\" ng-class=\"{\'show\':$index==show}\"><div class=\"text-area\" ng-if=\"img.title || img.description\"><div class=\"title\" ng-if=\"img.title\" ng-bind-html=\"img.title\"></div><div class=\"description\" ng-if=\"img.description\" ng-bind-html=\"img.description\"></div></div></div></div><div class=\"ng-hide\"><img ng-repeat=\"img in images\" ng-src=\"{{ img.url }}\" class=\"ng-hide\"></div><div class=\"slider-controls\"><button class=\"btn-prev\" ng-show=\"count>0\" ng-click=\"prev()\">prev</button> <button class=\"btn-next\" ng-show=\"count>0\" ng-click=\"next()\">next</button></div></div>");}]);