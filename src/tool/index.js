// 去掉字符串空格
const trim = (str = '') => str.replace(/\s*/g, "");

// 去掉字符串空格
const isPath = path => {
    const rg = new RegExp("^[A-z]:\\\\(.+?\\\\)*$");
    return rg(path);
};


module.exports = {
    trim,
    isPath
}