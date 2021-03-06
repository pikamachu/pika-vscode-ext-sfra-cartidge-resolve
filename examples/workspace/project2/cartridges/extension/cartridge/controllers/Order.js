'use strict';

var server = require('server');

server.extend(module.superModule); // TEST: module.superModule

server.prepend('OrderDetail', function (req, res, next) {
  var OrderHelpers = require("*/cartridge/scripts/order/orderHelpers") // TEST: */cartridge/scripts/order/orderHelpers
  if (OrderHelpers.checkSomething(req.querystring.checkCondition)) { // FIXME: OrderHelpers.checkSomething not resolving method on project1
      res.redirect(require('dw/web/URLUtils').url('Account-Show')); // TODO: Resolve require('dw/web/URLUtils').url
  }
  next();
});

server.append('OrderDetail', function (req, res, next) {
    var OrderHelpers = require('*/cartridge/scripts/order/orderHelpers'); // TEST: */cartridge/scripts/order/orderHelpers
    if (req.querystring.something) {
        OrderHelpers.doSomethingWithOrderModel(res.getViewData().order); // TEST: OrderHelpers.addShipmentStoreInfoToOrderModel
        // FIXME: Autocomplete OrderHelpers. resolves "base"
    }
    next();
});

module.exports = server.exports();
