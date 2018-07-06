'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _AppError = require('../helpers/AppError');

var _AppError2 = _interopRequireDefault(_AppError);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControllerMethods = function () {
  function ControllerMethods(name) {
    _classCallCheck(this, ControllerMethods);

    this.name = name;
    this.model = _models2.default[name];

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.list = this.list.bind(this);
    this.details = this.details.bind(this);
    this.delete = this.delete.bind(this);
  }

  _createClass(ControllerMethods, [{
    key: 'create',
    value: function create(req, res) {
      var _this = this;

      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password;

      var run_method = function run_method(record) {
        if (record !== null) {
          throw new _AppError2.default(_this.name + ' already exists for this email', 409);
        }
        console.log(firstName);
      };

      this.findRecord(res, { email: email }, run_method);
    }
  }, {
    key: 'update',
    value: function update(req, res) {}
  }, {
    key: 'list',
    value: function list(req, res) {}
  }, {
    key: 'details',
    value: function details(req, res) {
      var _this2 = this;

      var run_method = function run_method(record) {
        if (record == null) {
          throw new _AppError2.default(_this2.name + ' already does not exist', 404);
        }
        res.status(200).send(record);
      };
      this.findRecord(res, { id: 1 }, run_method);
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {}
  }, {
    key: 'findRecord',
    value: function findRecord(res, query, run_method) {
      _models2.default[this.name].findOne({ where: query }).then(function (record) {
        run_method(record);
      }).catch(function (err) {
        res.status(err.status).send(_Response2.default.handleErrors(err));
      });
    }
  }]);

  return ControllerMethods;
}();

exports.default = ControllerMethods;