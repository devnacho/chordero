(function(){
  var app = angular.module('fretboard', []);

  function FretboardCtrl(){
    this.scaleLength = 1630;
    this.fretboardHeight = 180;
    this.woodLength = 1200;

    this.strings = calculateStrings(this.fretboardHeight);
    this.frets = calculateFrets(this.scaleLength);
    this.simpleMarkers = calculateSimpleMarkers(this.fretboardHeight, this.frets);
    this.doubleMarkers = calculateDoubleMarkers(this.fretboardHeight, this.frets);

    this.notes = calculateNotes(this.strings, this.frets);

    this.toggleNote = function(string, fret){
      note = this.notes[string][fret];
      note.selected = ! note.selected;
    }

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
          markers.push({ xPosition: frets[i].xPosition - (frets[i].xPosition - frets[i - 1].xPosition) / 2,
                         yPosition: fretboardHeight / 2,
                         radius: 5});
        }
      }
      return markers;
    }

    function calculateDoubleMarkers(fretboardHeight, frets){
      var markers = [];

      for(var i = 1; i < frets.length ; i+=1) {
        if( i == 12 ){
          markers.push({ xPosition: frets[i].xPosition - (frets[i].xPosition - frets[i - 1].xPosition) / 2,
                         yPosition1: (fretboardHeight/ 2) - 35,
                         yPosition2: (fretboardHeight/ 2) + 35,
                         radius: 5});
        }

      }
      return markers;
    }

    function calculateNotes(strings, frets){
      var distanceToFret = 20;
      var notes = [];
      for(var i = 0; i < strings.length ; i+=1) {
        notes[i] = [];
        for(var j = 0; j < frets.length ; j+=1) {
          notes[i].push ({
                          xPosition: frets[j].xPosition - distanceToFret,
                          yPosition: strings[i].yPosition,
                          fret: j,
                          string: i,
                          selected: false
                        });
        }
      }

      return notes;
    }

  }



  function chord(){
    return {
        restrict: 'AE',
        replace: true,
        scope: {
          name: '@',
          positions: '@',
          fingers: '@',
          size: '@'
        },
        link : function (scope, elem, attrs) {
          var chord = chords.chord(scope.name, scope.positions,scope.fingers , scope.size);
          var canvas = $('<canvas></canvas>').attr({width:chord.getWidth(), height:chord.getHeight()}).insertAfter(elem);
          var ctx = canvas[0].getContext('2d');
          chord.Draw(ctx);
        }
    }
  }

  app.controller('FretboardCtrl', [FretboardCtrl] );
  app.directive('chord', [chord] );


})();

