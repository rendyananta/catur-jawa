/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/game.js":
/*!******************************!*\
  !*** ./resources/js/game.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var canvasElement = document.getElementById('board');
var canvasContext = canvasElement.getContext('2d');
var config = {
  canvas: {
    width: 1440,
    height: 1440
  },
  board: {
    columns: 40,
    rows: 40
  }
};
var boardWidth = config.board.columns * getBoxWidth();
var boardHeight = config.board.rows * getBoxHeight();
var boardX = (config.canvas.width - boardWidth) * 0.5;
var boardY = (config.canvas.height - boardHeight) * 0.5;
var grids = [];

var gridsState = _toConsumableArray(new Array(config.board.rows)).map(function () {
  return Array(config.board.columns).fill({
    content: null,
    user_id: null
  });
});

var turn = 'X';
var user = null;
var match = null;
var playerX = null;
var playerO = null;
var matchId = canvasElement.getAttribute('data-match-id');

function getMatch(matchId) {
  axios.get("/api/game/".concat(matchId)).then(function (res) {
    match = res.data.data;

    if (match.state !== undefined && match.state !== null && match.state !== '') {
      gridsState = match.state;
    }

    playerX = match.inviter_id;
    playerO = match.invitee_id;
    console.log(playerX);
    console.log(playerO);
    registerMouseEvent();
    createBoard();
    receiveGridUpdate(match);
  });
}

function getUser() {
  axios.get("/api/user").then(function (res) {
    user = res.data.data;
  });
}

function sendMovement(payload) {
  axios.patch('/api/game/' + match.id + '/move', {
    from: payload.grid,
    states: gridsState
  }).then(function (res) {
    console.log(res.data);
  });
}

function sendGridUpdate(x, y, gridState) {
  var payload = {
    grid: {
      x: x,
      y: y,
      state: gridState
    }
  };
  console.log('payload', payload);
  sendMovement(payload);
  Echo["private"]("match.".concat(match.id)).whisper('turn', payload);
}

function isPlayerX() {
  return match.inviter_id === user.id;
}

function isPlayerO() {
  return !isPlayerX();
}

function receiveGridUpdate(match) {
  Echo["private"]("match.".concat(match.id)).listenForWhisper('turn', function (e) {
    gridsState[e.grid.x][e.grid.y] = e.grid.state;
    drawSquare(e.grid.state);

    if (isPlayerX() && turn === 'O') {
      drawPlayerO(grids[e.grid.x][e.grid.y]);
      turn = 'X';
    } else if (isPlayerO() && turn === 'X') {
      drawPlayerX(grids[e.grid.x][e.grid.y]);
      turn = 'O';
    }
  });
}

function getBoxWidth() {
  return config.canvas.height * 0.9 / config.board.columns;
}

function getBoxHeight() {
  return config.canvas.width * 0.9 / config.board.rows;
}

function getMousePosition(event) {
  var rect = canvasElement.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function getGridFromMouse(x, y) {
  return grids.flat(2).find(function (i) {
    return x >= i.x && x <= i.xMax && y >= i.y && y <= i.yMax;
  });
}

function getGridIndex(gridItem) {
  var x = null;
  var y = null;

  for (var i = 0; i < config.board.columns; i++) {
    for (var j = 0; j < config.board.rows; j++) {
      if (grids[i][j] === gridItem) {
        x = i;
        y = j;
        break;
      }
    }
  }

  return {
    x: x,
    y: y
  };
}

function registerMouseEvent() {
  canvasElement.addEventListener('mousedown', function (event) {
    var mouse = getMousePosition(event);

    if (mouse.x >= getBoxWidth() && mouse.x <= config.canvas.width - getBoxWidth() && mouse.y >= getBoxHeight() && mouse.y <= config.canvas.height - getBoxHeight()) {
      var grid = getGridFromMouse(mouse.x, mouse.y);
      var gridIndex = getGridIndex(grid); // If it has been filled, so end it

      if (gridsState[gridIndex.x][gridIndex.y].content !== undefined && gridsState[gridIndex.x][gridIndex.y].content !== null) {
        return;
      }

      if (isPlayerX() && turn === 'X') {
        gridsState[gridIndex.x][gridIndex.y] = {
          content: 'X',
          user: playerX
        };
        drawSquare(grid, 'X');
        turn = 'O';
        sendGridUpdate(gridIndex.x, gridIndex.y, gridsState[gridIndex.x][gridIndex.y]);
      } else if (isPlayerO() && turn === 'O') {
        gridsState[gridIndex.x][gridIndex.y] = {
          content: 'O',
          user: playerO
        };
        drawSquare(grid, 'O');
        turn = 'X';
        sendGridUpdate(gridIndex.x, gridIndex.y, gridsState[gridIndex.x][gridIndex.y]);
      } else {
        console.log('not your turn');
      }
    }
  });
}

function drawSquare(options, step) {
  if (step !== undefined) {
    if (step === 'X') {
      drawPlayerX(options);
    } else if (step === 'O') {
      drawPlayerO(options);
    }
  }

  canvasContext.lineWidth = 1;
  canvasContext.beginPath();
  canvasContext.moveTo(options.xMax, options.y);
  canvasContext.lineTo(options.xMax, options.yMax);
  canvasContext.lineTo(options.x, options.yMax);
  canvasContext.stroke();
}

function drawPlayerX(options) {
  var smallRect = expandRect(options, -5);
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.moveTo(smallRect.x, smallRect.y);
  canvasContext.lineTo(smallRect.xMax, smallRect.yMax);
  canvasContext.stroke();
  canvasContext.beginPath();
  canvasContext.moveTo(smallRect.x, smallRect.yMax);
  canvasContext.lineTo(smallRect.xMax, smallRect.y);
  canvasContext.stroke();
}

function drawPlayerO(options) {
  var smallRect = expandRect(options, -5);
  var radius = Math.min(smallRect.width, smallRect.height);
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.arc(smallRect.x + smallRect.width * 0.5, smallRect.y + smallRect.height * 0.5, radius * 0.5, 0, Math.PI * 2);
  canvasContext.stroke();
}

function createRect(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    xMax: x + width,
    yMax: y + height
  };
}

function expandRect(rect, dx, dy) {
  if (dy === undefined) {
    dy = dx;
  }

  return createRect(rect.x - dx * 0.5, rect.y - dy * 0.5, rect.width + dx, rect.height + dy);
}

function calculateBoxRect(outerBox, x, y) {
  return createRect(outerBox.x + getBoxWidth() * x, outerBox.y + getBoxHeight() * y, getBoxWidth(), getBoxHeight());
}

function createGrids(outerBox, columns, rows) {
  for (var i = 0; i < columns; i++) {
    grids[i] = [];

    for (var j = 0; j < rows; j++) {
      grids[i][j] = calculateBoxRect(outerBox, i, j);
      drawSquare(grids[i][j]);
    }
  }
}

function createBoard() {
  // Set the board size
  canvasElement.setAttribute('width', config.canvas.width);
  canvasElement.setAttribute('height', config.canvas.height); // Setup board

  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, config.canvas.width, config.canvas.height);
  var outerBox = createRect(boardX, boardY, boardWidth, boardHeight); // Create board grids

  createGrids(outerBox, config.board.columns, config.board.rows);
  canvasContext.strokeStyle = 'black';
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.moveTo(outerBox.x, outerBox.y);
  canvasContext.lineTo(outerBox.xMax, outerBox.y);
  canvasContext.lineTo(outerBox.xMax, outerBox.yMax);
  canvasContext.lineTo(outerBox.x, outerBox.yMax);
  canvasContext.closePath();
  canvasContext.stroke();
} // Starts the game


getUser();
getMatch(matchId);

/***/ }),

/***/ 2:
/*!************************************!*\
  !*** multi ./resources/js/game.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/app/resources/js/game.js */"./resources/js/game.js");


/***/ })

/******/ });