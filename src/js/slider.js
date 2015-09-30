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
