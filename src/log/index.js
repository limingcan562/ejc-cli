const chalk = require('chalk');

const successLog = text => console.log(chalk.green(`success: ${text}`));

const warnLog = text => console.log(chalk.yellow(`warn: ${text}`));

const errorLog = text => console.log(chalk.red(`error: ${text}`));

const successText = text => chalk.green(text);

const warnText = text => chalk.yellow(text);

const errorText = text => chalk.red(text);

module.exports = {
    successLog,
    warnLog,
    errorLog,
    successText,
    warnText,
    errorText,
}