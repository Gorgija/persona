/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * A very thin wrapper around winston for general server logging.
 * Exports a winston Logger instance in exports.logger with several functions
 * corresponding to different log levels.  use it like this:
 *
 *     const logger = require('../libs/logging.js').logger;
 *     logger.debug("you can probably ignore this.  just for debugging.");
 *     logger.info("something happened, here's info about it!");
 *     logger.warn("this isn't good.  it's not a fatal error, but needs attention");
 *     logger.error("this isn't good at all.  I will probably crash soon.");
 */

const
winston = require("winston");

// Must be defined before including the transports. Some of the transports
// depend on the logger being available.
exports.logger = new winston.Logger({});

const
FileLogger = require('./transports/file'),
StatsdLogger = require('./transports/statsd'),
MetricsLogger = require('./transports/metrics'),
KpiLogger = require('./transports/kpi');

exports.logger.add(FileLogger, {});
exports.logger.add(StatsdLogger, {});
exports.logger.add(MetricsLogger, {});
exports.logger.add(KpiLogger, {});

exports.enableConsoleLogging = function() {
  exports.logger.add(winston.transports.Console, {
    colorize: true,
    handleExceptions: true
  });
};

if (process.env.LOG_TO_CONSOLE) exports.enableConsoleLogging();

exports.logger.exitOnError = false;