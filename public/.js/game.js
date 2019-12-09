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

var canvasElement = document.getElementById('board');
var canvasContext = canvasElement.getContext('2d');
var config = {
  canvas: {
    width: 720,
    height: 720
  },
  board: {
    columns: 8,
    rows: 8
  }
};
var mouse = {
  x: 0,
  y: 0
};
var mouseDown = false;
var grids = [];
var gridsState = [];
var turn = '';

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
  return grids.reduce(function (a, v) {
    return a.concat(v);
  }).find(function (k) {
    return x >= k.x && x <= k.xMax && y >= k.y && y <= k.yMax;
  });
}

function getGridIndex(gridItem) {
  return {
    x: Math.floor(gridItem.x / getBoxWidth()),
    y: Math.floor(gridItem.y / getBoxHeight())
  };
}

function registerMouseEvent() {
  canvasElement.addEventListener('mousemove', function (event) {
    mouse = getMousePosition(event);
  });
  canvasElement.addEventListener('mousedown', function (event) {
    mouseDown = true;
    mouse = getMousePosition(event);
  });
  canvasElement.addEventListener('mouseup', function (event) {
    mouseDown = false;
  });
}

function drawSquare(options) {
  var hover = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var click = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  hover = click ? click : hover;

  if (hover) {
    canvasContext.strokeStyle = 'lightgray';
  } else {
    canvasContext.strokeStyle = 'gray';
  }

  if (click) {}

  canvasContext.lineWidth = 1;
  canvasContext.beginPath();
  canvasContext.moveTo(options.xMax, options.y);
  canvasContext.lineTo(options.xMax, options.yMax);
  canvasContext.lineTo(options.x, options.yMax);
  canvasContext.stroke();
}

function createRect(x, y, width, height) {
  return {
    x: x,
    y: y,
    xMax: x + width,
    yMax: y + height
  };
}

function calculateBoxRect(outerBox, x, y) {
  return createRect(outerBox.x + getBoxWidth() * x, outerBox.y + getBoxHeight() * y, getBoxWidth(), getBoxHeight());
}

function createGrids(outerBox, columns, rows) {
  for (var i = 0; i < columns; i++) {
    grids[i] = [];
    gridsState[i] = [];

    for (var j = 0; j < rows; j++) {
      grids[i][j] = calculateBoxRect(outerBox, i, j);
      var hover = false;
      var grid = getGridFromMouse(mouse.x, mouse.y);

      if (grids[i][j] === grid) {
        hover = true;
      }

      drawSquare(grids[i][j], hover, mouseDown);
    }
  }
}

function createBoard() {
  // Set the board size
  canvasElement.setAttribute('width', config.canvas.width);
  canvasElement.setAttribute('height', config.canvas.height); // Setup board

  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, config.canvas.width, config.canvas.height);
  var boardWidth = config.board.columns * getBoxWidth();
  var boardHeight = config.board.rows * getBoxHeight();
  var boardX = (config.canvas.width - boardWidth) * 0.5;
  var boardY = (config.canvas.height - boardHeight) * 0.5;
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
}

setInterval(createBoard, 1000 / 30);
registerMouseEvent();

function sendGridUpdate(match) {
  Echo["private"]("match.".concat(match.id)).whisper('turn', {
    states: grids
  });
}

function receiveGridUpdate(match) {
  Echo["private"]("match.".concat(match.id)).listenForWhisper('turn', function (e) {
    gridsState = e.states;
  });
}

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