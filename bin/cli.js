#!/usr/bin/env node

const
{Command} = require('commander'),
program = new Command(),
pkg = require('../package.json'),
path = require('path'),
fs = require('fs-extra'),
{successLog,
    warnLog,
    errorLog,
    successText,
    warnText,
    errorText,
    descText,
    infoText
} = require('../src/log/index'),
{convertToJson, getTemplate} = require('../src/index');

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
.option('-sr, --start-row [number]', infoText('从excel表格第几行开始读取数据'))
.option('-js, --json-name [string]', infoText('输出的json名字'))
.action(function(options) {
    // console.log(options);
    if (options.input === true) {
        errorLog('input不能为空');
    }
    else if (!options.input.includes('/')) {
        errorLog('输入地址格式有误');
    }
    // 开始生成
    else {
        convertToJson(options);
    }
});


// 下载模板excel文件
program
.command('gt')
.description(infoText('获取excel模板文件'))
.argument('[path]', 'excel模板文件输出地址')
.action(function(option) {
    getTemplate(option);
});


// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
