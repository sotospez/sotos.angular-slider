#sotos.angular-slider module for angular
================
directive in angular 


###v0.0.1

[Demos http://sotos.gr/demos/angular-slider/ ](http://sotos.gr/demos/angular-slider/)


###Bower Install
```
bower install sotos.angular-slider
```

###Use
```html

  <div sotos-slider-up-down  offset-top="offsetTop" images="images">

      <div sotos-slider images="images.images1"   offset-top="offsetTop"></div>

      <div sotos-slider images="images.images2"   offset-top="offsetTop"></div>

  </div>

  <div sotos-slider images="images.images2"   offset-top="offsetTop"></div>

```
  
 
###set the module
`var app = angular.module('app',['sotos.angular-slider']);`
 
>in controller required

```javascript

 //the offsetTop top space for headers

 $scope.offsetTop=0;

 //image array

 $scope.images=[];

 $scope.images.images1=[];

 $scope.images.images2=[];

 $scope.images.images1.push({url:'img/1/01.jpg',title: $scope.trustedTitle,description:$scope.htmlDescr });

```



