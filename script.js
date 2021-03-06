// DATA CONTROLLER
var dataController = (function(UICtrl) {


})(UIController);

// UI CONTROLLER
var UIController = (function() {

  var mazeData = {
    canvas: document.getElementById('mazecanvas'),
    context: document.getElementById('mazecanvas').getContext('2d'), //returns methods/properties for drawing on the canvas
    mazeWidth: 592,
    mazeHeight: 482,
    currRectX: 4,
    currRectY: 95
  };


  return {
    drawMazeAndShapes: function() {
      UIController.eraseLastRect(0, 0, mazeData.canvas.width, mazeData.canvas.height);
      var img = new Image();
      // Draw everything that wil appear on the canvas
      img.crossOrigin = 'Anonymous';
      img.src = 'http://localhost/images/maze.jpg';
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
      UIController.eraseLastRect(mazeData.currRectX, mazeData.currRectY, 15, 15);
      mazeData.currRectX = rectX;
      mazeData.currRectY = rectY;
      mazeData.context.beginPath();
      mazeData.context.rect(rectX, rectY, 15, 15);
      mazeData.context.fillStyle = 'blue';
      mazeData.context.fill();
    },

    drawCir: function() {
      mazeData.context.beginPath();
      mazeData.context.arc(453, 16, 8, 0, 2 * Math.PI, false);
      mazeData.context.fillStyle = '#87FF45';
      mazeData.context.fill();
    },

    eraseLastRect: function (x, y, w, h) {
      mazeData.context.beginPath();
      mazeData.context.rect(x, y, w, h);
      mazeData.context.closePath();
      mazeData.context.fillStyle = 'white';
      mazeData.context.fill();
    },

    moveRect: function(e) {
      var newX, newY;
      e = e || window.event;
      switch (e.keyCode) {
        case 38: //move up
        case 87:
          newX = mazeData.currRectX;
          newY = mazeData.currRectY - 3;
          break;
        case 40: //move down
        case 83:
          newX = mazeData.currRectX;
          newY = mazeData.currRectY + 3;
          break;
        case 39: //move right
        case 68:
          newX = mazeData.currRectX + 3;
          newY = mazeData.currRectY;
          break;
        case 37: //move left
        case 65:
          newX = mazeData.currRectX - 3;
          newY = mazeData.currRectY;
          break;
        default: return;
      }

      var allowToMove = UIController.canMoveRect(newX, newY);
      if (allowToMove === 1) {
        UIController.drawRect(newX, newY);
        mazeData.currRectX = newX;
        mazeData.currRectY = newY;
      }
    },

    getMazeData: function() {
      return mazeData;
    },

    canMoveRect: function(pixelX, pixelY) {
      //var mazeDataObject = UICtrl.getMazeData();
      var imgData = mazeData.context.getImageData(pixelX, pixelY, 15, 15);
      var data = imgData.data;
      var canMove = 1; // 1 means rectangle can move (true)
      if (pixelX >= 0 && pixelX <= mazeData.mazeWidth && pixelY >= 0 && pixelY <= mazeData.mazeHeight) { // the canvas
        for (var i = 0; i < 4 * 15 * 15; i += 4) {
          if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { //black
            canMove = 0; // 0 means rectangle cannot move (false)
          } else if (data[i] === 51 && data[i + 1] === 232 && data[i + 2] === 51) {
            canMove = 0;
            }
          }
        } else if (pixelX < 20) {
          canMove = 0;
        }
        return canMove;
    }
  }


})();

// GLOBAL APP CONTROLLER
var controller = (function(dataCtrl, UICtrl) {

  var loadMaze = function() {
    UICtrl.drawMazeAndShapes();
    window.addEventListener('keydown', UICtrl.moveRect, true);
  };

  return {
    init: function () {
      loadMaze();
    }
  };


})(dataController, UIController);

controller.init();
