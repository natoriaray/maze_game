// DATA CONTROLLER
var dataController = (function() {






})();

// UI CONTROLLER
var UIController = (function() {

  var canvas = document.getElementById('mazecanvas');
  var context = canvas.getContext('2d'); //returns methods/properties for drawing on the canvas
  var img = new Image();

  return {
    drawMazeAndShapes: function() {
      // Draw everything that wil appear on the canvas
      img.src = '../img/maze.gif';
      img.onload = function() {
      // Draw maze image to canvas
        context.drawImage(img, 0, 0);
      // Draw rectangle
        UIController.drawRect();
      // Draw circle
        UIController.drawCir();
      }

    },

    drawRect: function() {
      context.beginPath();
      context.rect(24, 112, 15, 15);
      context.fillStyle = 'blue';
      context.fill();
    },

    drawCir: function() {
      context.beginPath();
      context.arc(472, 32, 8, 0, 2 * Math.PI, false);
      context.fillStyle = '#87FF45';
      context.fill();
    }
  };


})();

// GLOBAL APP CONTROLLER
var controller = (function(dataCtrl, UICtrl) {

  var loadMaze = function() {
    UICtrl.drawMazeAndShapes();
  }

  return {
    init: function () {
      loadMaze();
    }
  }


})(dataController, UIController);

controller.init();
