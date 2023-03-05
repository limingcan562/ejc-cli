#!/usr/bin/env node

const chalk = require('chalk');

const
{Command} = require('commander'),
program = new Command(),
pkg = require('../package.json'),
{successLog,
warnLog,
errorLog,
successText,
warnText,
errorText,
descText,
infoText
} = require('../src/log/index'),
path = require('path'),
fs = require('fs-extra');

// 基础配置
program
.name(pkg.name)
// .usage("[global options] command")
.description(`=> ${descText('让excel表格更好地管理你的json数据')}`)
.version(pkg.version, '-v', infoText('查看当前版本'))
.helpOption('-h, --help', infoText('查看帮助'));


// 转换功能
program
.option('-i, --input [path]', infoText('输入excel表格地址'))
.option('-o, --output [path]', infoText('json数据输出地址'))
.option('-k, --keys [string]', infoText('json数据每一行对应的keys'))
.action(function(options) {
    // console.log(options);
    if (options.input === true) {
        errorLog('input不能为空');
    }
    else if (!options.input.includes('/')) {
        errorLog('输入地址格式有误');
    }
});


// 下载模板excel文件
program
.command('gt')
.description(infoText('获取excel模板文件'))
.action(function(option) {
    const
    currentProjectPath = path.resolve('.'), // 用户当前项目所在目录
    cliPath = __dirname; // ejc-cli 命令执行所在的文件
    // console.log(currentProjectPath, cliPath);

    try {
        fs.copySync(path.resolve(cliPath, '../xlsx'), `${currentProjectPath}/xlsx_template`);
        successLog('模板excel获取成功');
    } catch (err) {
        console.log(errorText(err));;
    }
});


// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
