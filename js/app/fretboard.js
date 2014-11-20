(function(){
  var app = angular.module('fretboard', []);

  function FretboardCtrl(){
    this.scaleLength = 1630;
    this.fretboardHeight = 180;
    this.woodLength = 1200;

    this.strings = calculateStrings(this.fretboardHeight);


    function calculateStrings(fretboardHeight){
      var distanceToBorder = 10;
      var allStringsHeight = fretboardHeight - (distanceToBorder * 2);
      var distanceBetweenStrings = allStringsHeight / 5;

      var strings = [];
      for(var i = 0; i < 6; i+=1) {
        strings[i] = { yPosition: (distanceToBorder + i * distanceBetweenStrings) } ;
      }
      return strings;
    }

  }



  app.controller('FretboardCtrl', [FretboardCtrl] );


})();

