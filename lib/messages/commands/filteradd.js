'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var but = require('but');
var utils = require('../utils');
var BufferUtil = but.util.buffer;
var BufferWriter = but.encoding.BufferWriter;
var BufferReader = but.encoding.BufferReader;
var $ = but.util.preconditions;
var _ = but.deps._;

/**
 * Request peer to add data to a bloom filter already set by 'filterload'
 * @param {Buffer=} data - Array of bytes representing bloom filter data
 * @param {Object=} options
 * @extends Message
 * @constructor
 */
function FilteraddMessage(arg, options) {
  Message.call(this, options);
  this.command = 'filteradd';
  $.checkArgument(
    _.isUndefined(arg) || BufferUtil.isBuffer(arg),
    'First argument is expected to be a Buffer or undefined'
  );
  this.data = arg || BufferUtil.EMPTY_BUFFER;
}
inherits(FilteraddMessage, Message);

FilteraddMessage.prototype.setPayload = function(payload) {
  $.checkArgument(payload);
  var parser = new BufferReader(payload);
  this.data = parser.readVarLengthBuffer();
  utils.checkFinished(parser);
};

FilteraddMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  bw.writeVarintNum(this.data.length);
  bw.write(this.data);
  return bw.concat();
};

module.exports = FilteraddMessage;
