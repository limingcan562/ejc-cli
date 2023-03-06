const
xlsx = require('node-xlsx'),
fs = require('fs-extra'),
path = require('path'),
{successLog, errorLog, warnLog} = require('./log/index'),
config = require('./config/index'),
{ trim, isPath} = require('./tool/index');

// console.log(config);

function create(options) {
    // console.log(options);
    // console.log(path.resolve('.'));
    const 
    {input, output, keys, startRow, jsonName} = options,
    xlsxData = xlsx.parse(`${path.resolve('.', input)}`),
    totalSheet = xlsxData.filter(item => item.data.length !== 0), // 整个Sheet数据（去掉空的sheet）
    totalSheetNum = totalSheet.length, // 总共有几个表（去掉空的sheet）
    taskArr = [],// 生成json的任务队列
    finalOutPath = output || config.defaluOutPath, // 输出的json文件地址
    finalkeys = keys ? trim(keys).split(',') : config.prefixKeyName, // excel每行对应的key
    finalJsonName = trim(jsonName) ? jsonName.split(',') : config.prefixJsonName, // 输出的json名字
    finalJsonArr = [];


    console.log(keys);

    // 最外层
    for (let index = 0; index < totalSheet.length; index++) {
        const 
        everySheet = totalSheet[index],
        {name: everySheeName, data} = everySheet,
        renderData = data.splice(startRow - 1).filter(item => item.length !== 0),
        singleJsonArr = [],
        singleJsonObj = {};

        // console.log(renderData, 1);

        // 每行数据
        for (let index2 = 0; index2 < renderData.length; index2++) {
            const 
            singleRowObj = {}, // 用对象形式存放每一行的值
            singleValueArr = renderData[index2]; // 每一行的值（形式为数组）

            // 每行里的每个具体数据
            for (let index3 = 0; index3 < singleValueArr.length; index3++) {
                const value = singleValueArr[index3];

                if (keys) {
                    singleRowObj[finalkeys[index3]] = value;
                }
                else {
                    singleRowObj[`${finalkeys}_${index3 + 1}`] = value;
                }
            }
            singleJsonArr.push(singleRowObj);
        }

        singleJsonObj.xlsx_name = everySheeName;
        if (jsonName) {
            singleJsonObj[finalJsonName][index] = singleJsonArr;
        }
        else {
            singleJsonObj[finalJsonName] = singleJsonArr;
        }
        finalJsonArr.push(singleJsonObj);
    }
    
    console.log(finalJsonArr[0]);
}

module.exports = create;