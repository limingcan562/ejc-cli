const chalk = require('chalk');

// 返回带颜色的字
const successText = text => chalk.green(text);
const warnText = text => chalk.yellow(text);
const errorText = text => chalk.red(text);
const descText = text => chalk.gray(text);
const infoText = text => chalk.cyan(text);

module.exports = {
    successText,
    warnText,
    errorText,
    infoText,
    descText
}