"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppError = function (_Error) {
  _inherits(AppError, _Error);

  function AppError(message, status) {
    _classCallCheck(this, AppError);

    var _this = _possibleConstructorReturn(this, (AppError.__proto__ || Object.getPrototypeOf(AppError)).call(this, message));

    _this.name = _this.constructor.name;
    Error.captureStackTrace(_this, _this.constructor);
    _this.status = status || 500;

    return _this;
  }

  return AppError;
}(Error);

;

exports.default = AppError;