const chalk = require('chalk');

// 返回带颜色的字
const successText = text => chalk.green(text);
const warnText = text => chalk.yellow(text);
const errorText = text => chalk.red(text);
const descText = text => chalk.magenta(text);
const infoText = text => chalk.cyan(text);
const underlineText = text => chalk.underline.cyan(text);

module.exports = {
    successText,
    warnText,
    errorText,
    infoText,
    descText,
    underlineText
}