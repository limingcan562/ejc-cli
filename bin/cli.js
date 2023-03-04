#!/usr/bin/env node
const
{Command} = require('commander'),
program = new Command(),
pkg = require('../package.json'),
{successLog,
warnLog,
errorLog,
successText,
warnText,
errorText} = require('../src/log/index'),
path = require('path');

// 基础配置
program
.name(pkg.name)
.description('一个可以通过命令行把excel表格转json数据的工具', 'yellow')
.version(pkg.version, '-v', successText('当前版本'))
.helpOption('-h, --help', successText('查看帮助'));


// 转换功能
program
.option('-i, --input [path]', successText('输入excel表格地址'))
.option('-o, --output [path]', successText('json数据输出地址'))
.option('-k, --keys [string]', successText('json数据每一行对应的keys'))
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
.description(successText('获取excel模板文件'))
.action(function(option) {
    console.log('下载');
});


// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
