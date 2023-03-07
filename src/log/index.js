const chalk = require('chalk');
const logSymbols = require('log-symbols');
const log = console.log;

// 输出带颜色的打印
const successLog = text => log(logSymbols.success, chalk.green(text));
const warnLog = text => log(logSymbols.warning, chalk.yellow(text) );
const errorLog = text => log(logSymbols.error, chalk.red(text));
const infoLog = text => log(logSymbols.info, chalk.cyan(text));

module.exports = {
    successLog,
    warnLog,
    errorLog,
    infoLog
}