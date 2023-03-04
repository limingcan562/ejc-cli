const
xlsx = require('node-xlsx'),
fs = require('fs'),
path = require('path'),
{successLog, errorLog} = require('./log/index'),
config = require('./config/index');

console.log(successLog, errorLog);

const workSheetsFromFile = xlsx.parse(`${path.resolve(__dirname, '../xlsx/template.xlsx')}`);
// console.log(workSheetsFromFile[0]);