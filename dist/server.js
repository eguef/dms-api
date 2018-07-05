'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 8000 || ENV['PORT'];

(0, _route2.default)(app);
//listening to the port
app.listen(port, function () {
  console.log("Listening on port", port);
});