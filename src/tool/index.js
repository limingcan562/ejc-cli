const Config = require('../config/index');
const pkg = require('../../package.json');

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

// 获取 用于最后每个表格渲染的jsonk key值 
const getFinalKeys = (userKeys, totalSheetNum) => {
    let finalKeysArr = [];

    if (!userKeys) return;

    for (let index = 0; index < totalSheetNum; index++) {
        if (!userKeys.includes(Config.delimiter)) {
            let everyKeys = trim(userKeys).split(',');
            everyKeys = everyKeys.filter(i => i);
            finalKeysArr[index] = everyKeys;
        }
        else {
            let everyKeys = trim(userKeys).split(Config.delimiter)[index];

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

// 获取 用于最后每个表格，开始读取数据的行数
const getFinalStartRow = (userRow, totalSheetNum) => {
    let finalStartRow = [];
    let spliceLength = 2;

    for (let index = 0; index < totalSheetNum; index++) {
        if (!userRow) {
            finalStartRow[index] = [Config.defaultStartRow];
        }
        else if (!userRow.includes(Config.delimiter)) {
            let everyStartRow = parseInt(trim(userRow));
            finalStartRow[index] = [everyStartRow];
        }
        else {
            let everyStartRowStr = trim(userRow).split(Config.delimiter)[index];
            let everyStartRowArr = everyStartRowStr.split(',').filter(i => i && parseInt(i));
            let everyStartRow = everyStartRowArr.slice(0, spliceLength);

            // console.log(everyStartRow);

            if (everyStartRow.length !== 0) {
                finalStartRow[index] = everyStartRow;
            }
            else if (everyStartRow.length === 0) {
                finalStartRow[index] = [Config.defaultStartRow];
            }
        }
    }
    // console.log(finalStartRow);
    return finalStartRow;
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
    getFinalJsonName,
    getFinalStartRow,
}