const
xlsx = require('node-xlsx'),
fs = require('fs-extra'),
path = require('path'),
{successLog, errorLog, warnLog} = require('./log/index');

function create(options) {
    // console.log(options, path.resolve('.'));
    const 
    {input, output, keys, startLine} = options,
    xlsxData = xlsx.parse(`${path.resolve('.', input)}`),
    totalSheet = xlsxData.filter(item => item.data.length !== 0), // 整个Sheet数据（去掉空的sheet）
    totalSheetNum = totalSheet.length, // 总共有几个表（去掉空的sheet）
    taskArr = []; // 生成json的任务队列

    for (let index = 0; index < totalSheet.length; index++) {
        const 
        everySheet = totalSheet[index],
        {name: everySheeName, data} = everySheet,
        renderData = data.splice(startLine - 1).filter(item => item.length !== 0);

        console.log(renderData);
    }
    // console.log(totalSheet, totalSheetNum);
}

module.exports = create;