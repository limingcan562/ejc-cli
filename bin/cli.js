#!/usr/bin/env node

const
{Command} = require('commander'),
program = new Command(),
pkg = require('../package.json'),
{errorLog} = require('../src/log/index'),
{descText, infoText} = require('../src/text/index'),
{convertToJson, getTemplate} = require('../src/index'),
{isPath, trim} = require('../src/tool/index');

// 基础配置
program
.name(pkg.name)
// .usage("[global options] command")
.description(`${descText('让可视化的excel表格，更好地管理你的json数据')}`)
.version(pkg.version, '-v', infoText('查看当前版本'))
.helpOption('-h, --help', infoText('查看帮助'));


// 转换功能
program
.option('-i, --input [path]', infoText('excel表格所在路径'))
.option('-o, --output [path]', infoText('json数据保存路径'))
.option('-j, --json-name [string]', infoText('输出的json名字'))
.option('-k, --keys [string]', infoText('excel表格每一行对应的keys'))
.option('-s, --start-row [number]', infoText('从excel表格第几行开始读取数据'))
.action(function(options) {
    // console.log(options);
    try {
        if (options.input === true || !options.input) {
            errorLog('excel表格所在路径不能为空');
        }
        else if (!isPath(options.input)) {
            errorLog('excel表格所在路径格式有误');
        }
        else if (options.output && !isPath(options.output)) {
            errorLog('json数据保存路径格式有误');
        }
        // 开始生成
        else {
            convertToJson(options);
        }
    } catch (error) {
        errorLog(error);
    }
});

// 下载模板excel文件
program
.command('gt')
.description(infoText('获取excel模板文件'))
.argument('[path]', 'excel模板文件输出路径')
.action(function(option) {
    // console.log(option);
    if (option && !isPath(option)) {
        errorLog('输出路径格式有误')
    }
    else {
        getTemplate(option);
    }
});

// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
