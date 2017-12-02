var app = angular.module("app", ['ngRoute']);

app.config(function ($routeProvider) {
        $routeProvider
            .when('/',
                {
                    controller: 'HomeController',
                    templateUrl: 'results/main.html'
                })
            .when('/game',
                {
                    controller: 'GameController',
                    templateUrl: 'results/yourTurn.html'
                })
            .when('/results',
                {
                    controller: 'ResultsController',
                    templateUrl: 'results/results.html'
                })
            .otherwise( {redirectTo: '/'});
    });

app.controller('HomeController', function($scope, $http, $rootScope, $location) {
        $rootScope.user = "Brajan";

        $scope.start = function() {
            $location.path("/game");
        }
});

app.controller('GameController', function($scope, $http, $rootScope, $location, $timeout) {

    $scope.serverMessage = "Hmm... What the goat is it?";

    $scope.request = function() {
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var imgData=ctx.getImageData(0, 0, c.width, c.height);
//        console.log(imgData);
        var shorterData = []
        for (var i = 3; i < imgData.data.length; i = i+4) {
            var j = imgData.data[i];
            if (j > 0) {
//                console.log(j);
//                console.log(imgData.data[i]);
                j = 1;
            } else {
                j = 0;
            }
            shorterData.push(j);
        }

        var req = {
                method: 'POST',
                url: '/api/pictures',
                data: shorterData
                };
        $http(req).then(function successCallback(response) {
                console.log(response);
               $scope.serverMessage = response.data.value;
              $timeout($scope.request, 5000);
          }, function errorCallback(response) {
              $timeout($scope.request, 5000);
          });

      };

      $scope.clear = function() {
          var c=document.getElementById("myCanvas");
          var ctx=c.getContext("2d");
          ctx.clearRect(0, 0, c.width, c.height);
      };

      $scope.request();


});

app.controller('ResultsController', function($scope, $http, $rootScope, $location) {

    $scope.reset = function() {
        $location.path("/game");
    }
});

app.controller('DrawController', function($scope, $http, $rootScope, $location) {

	$scope.click = function() {
	//	console.log("log");
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	var imgData=ctx.getImageData(0, 0, c.width, c.height);
	console.log(imgData);
	
	 var req = {
            method: 'POST',
            url: '/api/pictures',
            data: imgData
            };
	$http(req);
	
  };
})

app.directive("drawing", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      var ctx = element[0].getContext('2d');
      ctx.lineWidth = 15;
      
      // variable that decides if something should be drawn on mousemove
      var drawing = false;
      
      // the last coordinates before the current move
      var lastX;
      var lastY;
      
      element.bind('mousedown', function(event){
        if(event.offsetX!==undefined){
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else {
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });
      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          if(event.offsetX!==undefined){
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }
          
          draw(lastX, lastY, currentX, currentY);
          
          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
        
      });
      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }
      
      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = "#000";
        // draw it
        ctx.stroke();
      }
    }
  };
});