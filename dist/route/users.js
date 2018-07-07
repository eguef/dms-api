'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../controllers/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.post('/users', _User2.default.create);
  app.put('/users/:id', _User2.default.update);
  app.get('/users/:id', _User2.default.details);
  app.get('/users', _User2.default.list);
  app.delete('/users/:id', _User2.default.delete);
};