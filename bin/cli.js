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
create = require('../src/index');

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
.option('-s, --start-line [number]', infoText('从excel表格第几行开始读取数据'))
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
        create(options);
    }
});


// 下载模板excel文件
program
.command('gt')
.description(infoText('获取excel模板文件'))
.argument('[path]', 'excel模板文件输出地址')
.action(function(option) {
    // console.log(option);
    const
    cliPath = __dirname, // ejc-cli 命令执行所在的文件
    currentProjectPath = path.resolve('.'); // 用户当前项目所在目录
    
    // console.log(currentProjectPath, cliPath);
    try {
        // 没有参数时候，excel模板文件，默认输出到用户当前项目根目录下
        if (!option) {
            fs.copySync(path.resolve(cliPath, '../xlsx'), `${currentProjectPath}/xlsx_template`);
        }
        // 有参数时，将excel模板文件输出到用户设定的目录下
        else {
            fs.copySync(path.resolve(cliPath, '../xlsx'), `${currentProjectPath}/${option}/`);
        }
        successLog('模板excel获取成功');
    } catch (err) {
        console.log(err);
    }
    
});


// console.log(process.argv);

// 默认显示帮助（没有输入任何参数）
if (process.argv && process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
