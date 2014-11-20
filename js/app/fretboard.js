(function(){
  var app = angular.module('fretboard', []);

  function FretboardCtrl(){
    this.scaleLength = 1630;
    this.fretboardHeight = 180;
    this.woodLength = 1200;

    this.strings = calculateStrings(this.fretboardHeight);
    this.frets = calculateFrets(this.scaleLength);


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

    function calculateFrets(scaleLength){
      var frets = [];
      var prevDistance = 0;


      for(var i = 0; i < 23; i+=1) {
        var currentDistance = (i == 0 ? 0 : (scaleLength - prevDistance) / 17.817 ) + prevDistance ; // Ternary operator

        frets[i] = { xPosition: currentDistance } ;
        prevDistance = currentDistance;
      }

      return frets;
    }

  }



  app.controller('FretboardCtrl', [FretboardCtrl] );


})();

