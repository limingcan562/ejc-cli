const Config = require('../config/index');

// 去掉字符串空格
const trim = (str = '') => str.replace(/\s*/g, "");

// 判断输入的是否为路径
const isPath = path => path.split('/').length > 1 || path.includes(`\\`);

// 获取值的类型
const getValueType = val => {
    // [object Null] 
    const lowerCaseStr = Object.prototype.toString.call(val).toLowerCase();
    const value1 = lowerCaseStr.split(' ')[1];
    const value2 = value1.split(']')[0];
    // console.log(value2);

    return value2;
}

// 获取 用户输入的-k 
const getFinalKeys = (userKeys, totalSheetNum) => {
    let finalKeysArr = [];

    for (let index = 0; index < totalSheetNum; index++) {
        if (!userKeys.includes('|')) {
            let everyKeys = trim(userKeys).split(',');
            everyKeys = everyKeys.filter(i => i);
            finalKeysArr[index] = everyKeys;
        }
        else {
            let everyKeys = trim(userKeys).split('|')[index];
            
            if (everyKeys.length !== 0) {
                everyKeys = everyKeys.split(',').filter(i => i);
                finalKeysArr[index] = everyKeys;
            }
            else if (everyKeys.length === 0) {
                finalKeysArr[index] = [];
            }
        }
    }


    return finalKeysArr;
}


// 获取 用户输入的-n
const getFinalJsonName = userJsonName => {
    let jsonName = null;
    if (userJsonName) {
        jsonName = trim(userJsonName).split(',');
        // 防止用户有以逗号结尾的
        jsonName = jsonName.filter(item => item);
    }
    else {
        jsonName = Config.defaultPrefixJsonName;
    }
    return jsonName;
}


module.exports = {
    trim,
    isPath,
    getValueType,
    getFinalKeys,
    getFinalJsonName
}