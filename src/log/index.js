const chalk = require('chalk');
const logSymbols = require('log-symbols');

const Log = (text, type) => {
    switch (type) {
        case 'success':
            console.log(logSymbols.success, chalk.green(`${text}`));
            break;
        case 'fail':
            console.log(logSymbols.error, chalk.red(`${text}`));
            break;
        case 'warn':
            console.log(logSymbols.warning, chalk.yellow(`${text}`));
            break;
        case 'info':
            console.log(logSymbols.info, chalk.hex('#A37FFF')(`${text}`));
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