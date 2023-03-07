const path = require('path');

module.exports = {
    // excel模板存放的文件夹
    templateName: 'template',

    // 默认输出excel模板文件名字
    defaultOutTemplateName: 'xlsx_template',

    // 默认josn数据输出目录（当前项目根目录的xlsx_json文件夹）
    defaluOutPath: path.resolve('.', './xlsx_json/'),

    // 默认输出的json名字前缀
    prefixJsonName: 'data',
    
    // 默认excel每行字段对应的key前缀
    prefixKeyName: 'key',
}