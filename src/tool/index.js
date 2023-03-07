// 去掉字符串空格
const trim = (str = '') => str.replace(/\s*/g, "");

// 判断输入的是否为路径
const isPath = path => path.split('/').length > 1 || path.includes(`\\`);


module.exports = {
    trim,
    isPath
}