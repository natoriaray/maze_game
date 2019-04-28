// DATA CONTROLLER
var dataController = (function(e) {


})();

// UI CONTROLLER
var UIController = (function() {

  var mazeData = {
    canvas: document.getElementById('mazecanvas'),
    context: document.getElementById('mazecanvas').getContext('2d'), //returns methods/properties for drawing on the canvas
    currRectX: 24,
    currRectY: 112
  };

  var img = new Image();

  return {
    drawMazeAndShapes: function() {
      img.crossOrigin = "Anonymous";
      // Draw everything that wil appear on the canvas
      img.src = '../img/maze.gif';
      img.onload = function() {
      // Draw maze image to canvas
        mazeData.context.drawImage(img, 0, 0);
      // Draw rectangle
        UIController.drawRect(mazeData.currRectX, mazeData.currRectY);
      // Draw circle
        UIController.drawCir();
      }

    },

    drawRect: function(rectX, rectY) {
      mazeData.context.beginPath();
      mazeData.context.rect(rectX, rectY, 15, 15);
      mazeData.context.fillStyle = 'blue';
      mazeData.context.fill();
    },

    drawCir: function() {
      mazeData.context.beginPath();
      mazeData.context.arc(472, 32, 8, 0, 2 * Math.PI, false);
      mazeData.context.fillStyle = '#87FF45';
      mazeData.context.fill();
    },

    moveRect: function() {
      var newX, newY;
      e = window.event;
      switch (e.keycode) {
        case 38: //move up
        case 87:
          newY = mazeData.currRectY - 3;
          break;
        case 40: //move down
        case 83:
          newY = mazeData.currRectY + 3;
          break;
        case 39: //move right
        case 68:
          newX = mazeData.currRectX + 3;
          break;
        case 37: //move left
        case 65:
          newX = mazeData.currRectX - 3;
          break;
        default: return;
      }
      var allowToMove = controller.canMoveRect(newX, newY);
      if (allowToMove === 1) {
        UIController.drawRect(newX, newY);
        mazeData.currRectX = newX;
        mazeData.currRectY = newX;
      }
    },

    getMazeData: function() {
      return mazeData;
    }
  };


})();

// GLOBAL APP CONTROLLER
var controller = (function(dataCtrl, UICtrl) {

  var loadMaze = function() {
    UICtrl.drawMazeAndShapes();
    window.addEventListener('keydown', canMoveRect);
  };

  var canMoveRect = function(pixelX, pixelY) {
    var mazeDataObject = UICtrl.getMazeData();
    var imgData = mazeDataObject.context.getImageData(pixelX, pixelY, 15, 15);
    var data = imgData.data;
    var canMove = 1; // 1 means rectangle can move (true)
    if (pixelX >= 0 && pixelY >= 0) { // the canvas
      for (var i = 0; i < data.length; i += 4) {
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { //black
          canMove = 0; // 0 means rectangle cannot move (false)
        } else if (data[i] === 51 && data[i + 1] === 232 && data[i + 2] === 51) {
          canMove = 0;
          }
        }
      }

  };

  return {
    init: function () {
      loadMaze();
    }
  };


})(dataController, UIController);

controller.init();
