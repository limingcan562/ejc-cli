const chalk = require('chalk');

// 输出带颜色的打印
const successLog = text => console.log(chalk.green(`success: ${text}`));
const warnLog = text => console.log(chalk.yellow(`warn: ${text}`));
const errorLog = text => console.log(chalk.red(`error: ${text}`));

// 返回带颜色的字
const successText = text => chalk.green(text);
const warnText = text => chalk.yellow(text);
const errorText = text => chalk.red(text);
const descText = text => chalk.gray(text);
const infoText = text => chalk.cyan(text);

module.exports = {
    successLog,
    warnLog,
    errorLog,
    successText,
    warnText,
    errorText,
    infoText,
    descText
}