const
xlsx = require('node-xlsx'),
fs = require('fs-extra'),
path = require('path'),
{successLog, errorLog, warnLog} = require('./log/index');

const 
xlsxData = xlsx.parse(`${path.resolve(__dirname, '../xlsx/template.xlsx')}`),
totalSheet = xlsxData.filter(item => item.data.length !== 0).length, // 去掉空的sheet
taskArr = []; // 生成json的任务队列


// console.log(xlsxData);
// console.log(totalSheet);

function create(options) {
    console.log(options);
}

module.exports = create;