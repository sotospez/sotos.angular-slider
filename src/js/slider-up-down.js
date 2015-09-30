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
