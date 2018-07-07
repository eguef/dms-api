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
  function ControllerMethods(name, unique) {
    _classCallCheck(this, ControllerMethods);

    this.name = name;
    this.unique = unique;

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

      var run_method = function run_method(record) {
        if (record && _this.unique) {
          throw new _AppError2.default(_this.name + ' already exists for this ' + _this.unique, 409);
        }
        _this.validateParams(req.body);
        _models2.default[_this.name].create(req.body).then(function (newRecord) {
          res.status(200).send(newRecord);
        }).catch(function (err) {
          res.send(err.message);
        });
      };
      if (this.unique) {
        var query = {};
        query[this.unique] = req.body[this.unique];
        this.findRecord(res, query, run_method);
      } else {
        run_method();
      }
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var _this2 = this;

      var run_method = function run_method(record) {
        if (record == null) {
          throw new _AppError2.default(_this2.name + ' does not exist', 404);
        }

        record.update(req.body).then(function (updatedRecord) {
          res.status(200).send(updatedRecord);
        }).catch(function (err) {
          res.send(err.message);
        });
      };

      this.findRecord(res, { id: req.params.id }, run_method);
    }
  }, {
    key: 'list',
    value: function list(req, res) {
      _models2.default[this.name].findAll({ where: { deprecated_at: null } }).then(function (records) {
        res.status(200).send(records);
      }).catch(function (err) {
        res.send(err);
      });
    }
  }, {
    key: 'details',
    value: function details(req, res) {
      var _this3 = this;

      var run_method = function run_method(record) {
        if (record == null) {
          throw new _AppError2.default(_this3.name + ' does not exist', 404);
        }
        res.status(200).send(record);
      };
      this.findRecord(res, { id: req.params.id }, run_method);
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var _this4 = this;

      var run_method = function run_method(record) {
        if (record == null) {
          throw new _AppError2.default(_this4.name + ' does not exist', 404);
        }

        var currentTime = new Date();
        record.update({ deprecated_at: currentTime.toISOString() }).then(function (deletedRecord) {
          res.status(200).send(deletedRecord);
        }).catch(function (err) {
          res.send(err);
        });
      };

      this.findRecord(res, { id: req.params.id }, run_method);
    }
  }, {
    key: 'findRecord',
    value: function findRecord(res) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: this.id };
      var run_method = arguments[2];

      query['deprecated_at'] = null;
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