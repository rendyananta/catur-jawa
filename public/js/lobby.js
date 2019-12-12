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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/lobby.js":
/*!*******************************!*\
  !*** ./resources/js/lobby.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function accept(match, acceptValue) {
  axios.patch("/api/game/".concat(match.id, "/accept"), {
    accept: acceptValue
  }).then(function (res) {
    console.log(res.data);
  });
}

function invitationAccepted(match) {
  Echo["private"]("invitation_status.".concat(match.id)).listen('InvitationAccepted', function (e) {
    if (e.match.accepted) {
      swal.fire({
        title: 'Tantangan diterima'
      }).then(function () {
        window.location.href = "".concat(window.location.host, "/game/").concat(match.id);
      });
    } else {
      swal.fire({
        title: 'Tantangan ditolak'
      });
    }
  });
}

function waitForInvitations() {
  axios.get('/api/user').then(function (res) {
    Echo["private"]("invitations.".concat(res.data.data.id)).listen('InvitationCreated', function (e) {
      swal.fire({
        title: 'Tantangan baru',
        text: "Penantang : ".concat(e.match.inviter.name),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Terima tantangan',
        cancelButtonText: 'Tolak',
        reverseButtons: true
      }).then(function (result) {
        if (result.value) {
          accept(e.match, 1);
          window.location.href = "".concat(window.location.host, "/game/").concat(e.match.id);
        } else if (result.dismiss === swal.DismissReason.cancel) {
          accept(e.match, 0);
        } else {
          accept(e.match, 0);
        }
      });
    });
  });
}

function getUsers() {
  axios.get('/api/users/').then(function (res) {
    createRow(res.data.data);
  });
}

function createRow(users) {
  var body = document.getElementById('table-body');
  body.innerHTML = '';
  users.forEach(function (user, index) {
    var tr = document.createElement('tr');
    tr.innerHTML = "<td>".concat(index + 1, "</td>") + "<td>".concat(user.name, "</td>") + "<td><button class='button is-danger is-small' id=\"invitation-".concat(user.id, "\" data-invitation-id=\"").concat(user.id, "\">Tantang</button></td>");
    body.append(tr);
    var btn = document.getElementById("invitation-".concat(user.id));
    btn.addEventListener('click', function () {
      axios.post('/api/game', {
        invitee_id: user.id
      }).then(function (res) {
        invitationAccepted(res.data.data);
      });
    });
  });
}

getUsers();
waitForInvitations();
var refresh = document.getElementById('refresh');
refresh.addEventListener('click', function () {
  getUsers();
});

/***/ }),

/***/ 3:
/*!*************************************!*\
  !*** multi ./resources/js/lobby.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/app/resources/js/lobby.js */"./resources/js/lobby.js");


/***/ })

/******/ });