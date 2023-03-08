#!/usr/bin/env node

const
{Command} = require('commander'),
program = new Command(),
pkg = require('../package.json'),
Text = require('../src/text/index'),
Core = require('../src/index'),
Tool = require('../src/tool/index'),
Log = require('../src/log/index');

// 基础配置
program
.name(pkg.name)
// .usage("[global options] command")
.description(`${Text.descText('=> 用可视化的excel表格，更好地管理你的json数据')}`)
.version(pkg.version, '-v', Text.infoText('查看当前版本'))
.helpOption('-h, --help', Text.infoText('查看帮助'));


// 转换功能
program
.option('-i, --input [path]', Text.infoText('excel表格所在路径'))
.option('-o, --output [path]', Text.infoText('json数据保存路径'))
.option('-j, --json-name [string]', Text.infoText('输出的json名字'))
.option('-k, --keys [string]', Text.infoText('excel表格每一行对应的keys'))
.option('-s, --start-row [number]', Text.infoText('从excel表格第几行开始读取数据'))
.action(function(options) {
    try {
        if (options.input === true || !options.input) {
            throw 'excel表格所在路径不能为空';
        }
        else if (!Tool.isPath(options.input)) {
            throw 'excel表格所在路径格式有误';
        }
        else if (options.output && !Tool.isPath(options.output)) {
            throw 'json数据保存路径格式有误';
            
        }
        // 开始生成
        else {
            Core.convertToJson(options);
        }
    } catch (error) {
        Log(error, 'fail');
    }
});

// 下载模板excel文件
program
.command('gt')
.description(Text.infoText('获取excel模板文件'))
.argument('[path]', 'excel模板文件输出路径')
.action(function(option) {
    // console.log(option);
    if (option && !Tool.isPath(option)) {
        Log('输出路径格式有误', 'fail');
    }
    else {
        Core.getTemplate(option);
    }
});

// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
