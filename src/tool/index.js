const Config = require('../config/index');

// 去掉字符串空格
const trim = (str = '') => str.replace(/\s*/g, "");

// 判断输入的是否为路径
const isPath = path => path.split('/').length > 1 || path.includes(`\\`);

// 获取 用户输入的-k 
const getFinalKeys = userKeys => {
    let keys = null;
    if (userKeys) {
        keys = trim(userKeys).split(',');
        // 防止用户输入的key有以逗号结尾的
        keys = keys.filter(item => item);
    }
    else {
        keys = Config.defaultPrefixKeyName;
    }
    return keys;
}


// 获取 用户输入的-n
const getFinalJsonName = userJsonName => {
    let jsonName = null;
    if (userJsonName) {
        jsonName = trim(userJsonName).split(',');
        // 防止用户输入的key有以逗号结尾的
        jsonName = keys.filter(item => item);
    }
    else {
        jsonName = Config.defaultPrefixJsonName;
    }
    return jsonName;
}




module.exports = {
    trim,
    isPath,
    getFinalKeys,
    getFinalJsonName
}