const chalk = require('chalk');
const ora = require('ora');
const spinner = ora();

const Log = (text, type) => {
    switch (type) {
        case 'start':
            spinner.start(text);
            break;
        case 'success':
            spinner.succeed(chalk.green(`${text}`));
            break;
        case 'fail':
            spinner.fail(chalk.red(`${text}`));
            break;
        case 'warn':
            spinner.warn(chalk.yellow(`${text}`));
            break;
        case 'info':
            spinner.info(chalk.cyan(`${text}`));
            break;
    }
}


// 输出带颜色的打印
// const successLog = text => log(chalk.green(text));
// const warnLog = text => log(chalk.yellow(text));
// const errorLog = text => log(chalk.red(text));
// const infoLog = text => log(chalk.cyan(text));

// module.exports = {
//     successLog,
//     warnLog,
//     errorLog,
//     infoLog
// }
module.exports = Log;