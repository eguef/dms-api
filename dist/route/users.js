'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../controllers/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.get('/', _User2.default.details);

  app.post('/signup', _User2.default.create);
};