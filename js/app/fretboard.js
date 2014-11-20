(function(){
  var app = angular.module('fretboard', []);

  function FretboardCtrl(){
    this.scaleLength = 1630;
    this.fretboardHeight = 180;
    this.woodLength = 1200;
  }

  app.controller('FretboardCtrl', [FretboardCtrl] );


})();

