#!/usr/bin/env node

const
{Command} = require('commander'),
fs = require('fs-extra'),
path = require('path'),
pkg = require('../package.json'),
Text = require('../src/text/index'),
Core = require('../src/index'),
Tool = require('../src/tool/index'),
Log = require('../src/log/index'),
program = new Command();

// 基础配置
program
.name(pkg.name)
// .usage("[global options] command")
.description(`${Text.descText('=> Manage your json data better with visual excel sheets')}`)
.version(pkg.version, '-v', Text.infoText('View current version'))
.helpOption('-h, --help', Text.infoText('View help'));


// 转换功能
program
.option('-i, --input [path]', Text.infoText('The excel table to be read'))
.option('-o, --output [path]', Text.infoText('Path to the output json file'))
.option('-n, --json-name [string]', Text.infoText('Name of the output json file'))
.option('-k, --keys [string]', Text.infoText('The key value corresponding to each row of each sheet'))
.option('-s, --start-row [number]', Text.infoText('Read data from what row of excel'))
.action(function(options) {
    try {
        // 验证-i
        if (options.input === true || !options.input) {
            throw '"-i" or "--input" is required';
        }
        else if (!Tool.isPath(options.input)) {
            throw 'The path where excel is located is incorrect';
        }
        else if (!fs.existsSync(path.resolve('./', options.input))) {
            throw 'excel file does not exist';
        }
        // 验证-s
        // else if (!options.startRow) {
        //     throw '"-s" or "--start-row" is required';
        // }
        else if (options.startRow && !Tool.getValueType(options.startRow).includes('str')) {
            throw 'The value of "-s" or "--start-row" needs to be a string or an integer';
        }
        // 验证-o
        else if (options.output && !Tool.isPath(options.output)) {
            throw 'The output path of the json file is incorrect';
        }
        // 验证-k
        else if (options.keys && Tool.getValueType(options.keys).includes('boo')) {
            throw 'The value of "-s" or "--start-row" needs to be a string';
        }
        // 验证-n
        else if (options.jsonName && Tool.getValueType(options.jsonName).includes('boo')) {
            throw 'The value of "-n" or "--json-name" needs to be a string';
        }
        // 开始生成
        else {
            Core.convertToJson(options);
        }
    } catch (error) {
        // console.log(error);
        Log(error, 'fail');
    }
});

// 下载模板excel文件
program
.command('gt')
.description(Text.infoText('Get the excel template file'))
.argument('[path]', Text.infoText('Excel template file output path'))
.action(function(option) {
    // console.log(option);
    try {
        if (option && !Tool.isPath(option)) {
            throw 'Incorrect output path format';
        }
        else {
            Core.getTemplate(option);
        }
    } catch (error) {
        Log(error, 'fail');
    }
});

// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
