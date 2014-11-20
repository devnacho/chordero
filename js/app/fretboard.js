(function(){
  var app = angular.module('fretboard', []);

  function FretboardCtrl(){
    this.scaleLength = 1630;
    this.fretboardHeight = 180;
    this.woodLength = 1200;

    this.strings = calculateStrings(this.fretboardHeight);
    this.frets = calculateFrets(this.scaleLength);
    this.simpleMarkers = calculateSimpleMarkers(this.fretboardHeight, this.frets);

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

    function calculateSimpleMarkers(fretboardHeight, frets){
      var markers = [];
      for(var i = 1; i < frets.length ; i+=1) {
        if( i % 2 && i != 1 && i != 11 && i != 13 & i != 23 ){
          markers.push({ xPosition: frets[i].xPosition - (frets[i].xPosition - frets[i - 1].xPosition) / 2, yPosition: fretboardHeight / 2, radius: 5});
        }
      }
      return markers;
    }

  }



  app.controller('FretboardCtrl', [FretboardCtrl] );


})();

