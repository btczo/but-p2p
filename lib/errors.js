'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on but-p2p Module {0}'
};

module.exports = require('but').errors.extend(spec);
