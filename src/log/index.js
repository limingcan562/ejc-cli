const chalk = require('chalk');
const log = console.log;

// 输出带颜色的打印
const successLog = text => log(chalk.bgGreen(' success '), chalk.bold.green(text));
const warnLog = text => log(chalk.bgYellow(' warn '), chalk.bold.yellow(text) );
const errorLog = text => log(chalk.bgRed(' error '), chalk.bold.red(text));
const infoLog = text => log(chalk.bgCyan(' info '), chalk.bold.cyan(text));

module.exports = {
    successLog,
    warnLog,
    errorLog,
    infoLog
}