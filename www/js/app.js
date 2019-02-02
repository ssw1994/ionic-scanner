// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

app.controller("whatsapp",function($scope,$state,$stateParams,$http){


  $scope.mobileNumber = 919403483605;
  $scope.API_KEY = "5O45OYKJKMXX0LANU0BV";
  $scope.API_END_POINT = "http://panel.apiwha.com/get_messages.php?apikey="+$scope.API_KEY+"&number="+$scope.mobileNumber;
  $scope.messages = [];
  /** 
   * @author SSW
   * @description this function is used on initialization of component
  */
  $scope.init = function(){
    try{
      $scope.getMessage();
    }catch(error){
      console.error(error);
    }
  }

  /** 
   * @author SSW
   * @description this function is used for getting whatsapp message
  */
  $scope.getMessage = function(){
    try{
      $http.get($scope.API_END_POINT).then(function(res){
        if(res){
          console.log(res);
          $scope.messages = res;
        }
      });
    }catch(error){
      console.error(error);
    }
  }

  $scope.init();
});


app.controller("scanner", function($scope, $state,$stateParams,$http, $cordovaBarcodeScanner) {
  $scope.codes = [];
  $scope.scannedcodes = "";
  $scope.productId = $stateParams.param && $stateParams.param.id ? $stateParams.param.id : null;
  console.log($scope.productId);
  $scope.scanBarcode = function() {
    try{
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        $scope.codes = $scope.scannedcodes.split(",");
        if(imageData && imageData.text){
          $scope.codes.push(imageData.text);
          $scope.scannedcodes = $scope.codes.join(); 
        }
      }, function(error) {
        console.error(error);
      });
    }catch(error){
      console.error(error);
    }
  };

  $scope.reset = function(){
    try{
      $scope.scannedcodes = "";
    }catch(error){
      console.error(error);
    }
  }

  $scope.saveBarcodes = function(codes){
    try{
      var obj = {
        productId:$scope.productId,
        codes:codes
      }
      $http.put("https://sheltered-crag-25135.herokuapp.com/users/register",obj).then(function(response) {
        console.log(response);
        if(response){
          $state.go("list").then(function(res){
            $scope.reset();
          });
        }
      });
    }catch(error){
      console.error(error);
    }
  }
})

app.controller("listCtrl",function($scope,$http,$state){
  $scope.list = [];
  $scope.init = function(){
    console.log("I am called");
      $scope.getList();
  }



  $scope.getList = function(){
    try{
      $http.get("./js/list.json")
      .then(function(response) {
          console.log(response);
          if(response)
            $scope.list = response.data ? response.data : [];
      });
    }catch(error){
      console.error(error);
    }
  }

  $scope.gotoScannerState = function(iObj){
    $state.go("scan",{param:{id:iObj.productId}});
  }
  $scope.init();
})

/*(function(){
    app.component("listComponent",{
    templateUrl:".template/list.html",
    controller:['$scope','$http','$state',function($scope,$http,$state){
      var _listCtrl = this;
      alert("list");
      _listCtrl.getList() = function(){
        try{

        }catch(error){
          console.error(error);
        }
      }

      _listCtrl.gotoScannerState = function(iObj){
        try{
          $state.go("scan",{param:{id:iObj.productId}});
        }catch(error){
          console.error(error);
        }
      }

      _listCtrl.$onInit = function(){
        try{
          alert("init");
        }catch(error){
          console.error(error);
        }
      }

      _listCtrl.$onDestroy = function(){
        try{  
          alert("destroyed");
        }catch(error){
          console.error(error);
        }
      }
    }]
  })
})();

(function(){
  app.component("scannerComponent",{
    templateUrl:"./template/barcodes.html",
    controller: ['$scope','$cordovaBarcodeScanner','$http','$stateParams',function($scope,$cordovaBarcodeScanner,$http,$stateParams){
      
      var _scanCtrl = this;
      _scanCtrl.scanBarcode = function() {
          $cordovaBarcodeScanner.scan().then(function(imageData) {
            if(imageData && imageData.text){
              //$scope.codes.push({barcode:imageData.text});
              $scope.scannedcodes += imageData.text;
            }
          }, function(error) {
            console.error(error);
        });
      }
  
      _scanCtrl.$onInit = function(){
        try{
          alert("init")
        }catch(error){
          console.error(error);
        }
      }
  
     _scanCtrl.$onDestroy = function(){
      try{
        alert("destroyed");
      }catch(error){
        console.error(error);
      }
     }
    }]
  })
  
})();*/


app.config(function($stateProvider,$urlRouterProvider) {
  var listState = {
    name: 'list',
    url: '/list',
    //template:"<list-Component></list-Component>"
    templateUrl: './template/list.html',
    controller:'listCtrl'
  }

  var scannerState = {
    name: 'scan',
    url: '/scan/{param:json}',
    templateUrl: './template/barcodes.html',
    params:{param:{productId:null}},
    controller:"scanner"
  }

  var whatsappState = {
    name:'whatsapp',
    url:'/whatsapp',
    templateUrl:"./template/whatsappview.html",
    controller:"whatsapp"
  }

  $stateProvider.state(listState);
  $stateProvider.state(scannerState);
  $stateProvider.state(whatsappState);


  $urlRouterProvider.otherwise('/whatsapp');

})



