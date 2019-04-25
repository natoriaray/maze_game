// DATA CONTROLLER
var dataController = (function(e) {


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
    },

    moveRect: function() {
      var newX, newY;
      e = window.event;
      switch (e.keycode) {
        case 38: //move up
        case 87:
          newY = currRectY - 3;
          break;
        case 40: //move down
        case 83:
          newY = currRectY + 3;
          break;
        case 39: //move right
        case 68:
          newX = currRectX + 3;
          break;
        case 37: //move left
        case 65:
          newX = currRectX - 3;
          break;
        default: return;
      }
    }
  };


})();

// GLOBAL APP CONTROLLER
var controller = (function(dataCtrl, UICtrl) {

  var loadMaze = function() {
    UICtrl.drawMazeAndShapes();
  };

  var setupEventListeners = function() {

  }

  return {
    init: function () {
      loadMaze();
    }
  };


})(dataController, UIController);

controller.init();
