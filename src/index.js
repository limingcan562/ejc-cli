const
xlsx = require('node-xlsx'),
fs = require('fs-extra'),
path = require('path'),
Config = require('./config/index'),
Tool = require('./tool/index'),
Text = require('./text/index'),
Log = require('./log/index'),
Table = require('cli-table'),
chalk = require('chalk');

// 将excel转换成json
function convertToJson(options) {
    /**
     * @options 用户终端输入的指令
     * @originalXlsxData 最原始的excel表格数据
     * @totalSheet 去掉空的 originalXlsxData 内可能存在的空数据
     * @totalSheetNum 总共有几个表（去掉空的sheet，有些表格里面没东西）
     * @finalOutPath 输出的json文件地址
     * @finalkeys excel每行对应的key
     * @finalJsonName 输出的json文件名
     * @finalJsonArr 用来存放生成的每条json数据的容器
     * @table 用表格形式来描述输出文件的信息
     */

    const 
    {input: userInput, output: userOut, keys: userKeys, startRow = Config.defaultStartRow, jsonName: userJsonName} = options,
    originalXlsxData = xlsx.parse(`${path.resolve('./', userInput)}`),
    totalSheet = originalXlsxData.filter(item => item.data.length !== 0),
    totalSheetNum = totalSheet.length,
    finalOutPath = userOut ? path.resolve('./', userOut) : Config.defaluOutPath,
    finalkeys = Tool.getFinalKeys(userKeys),
    finalJsonName = Tool.getFinalJsonName(userJsonName),
    finalJsonArr = [],
    table = new Table({
        head: [Text.infoText('Json file name'), Text.infoText('File location')],
        // colWidths: [50, 100]
    });

    console.log();
    Log('Please confirm that you read the data from the row of excel.', 'info');
    console.log(chalk.hex('#A37FFF')(`The current number of rows to read is`), `${Text.infoText(startRow)}.`);
    console.log();

    Log('Json data being generated...', 'info');

    // 最外层
    for (let index = 0; index < totalSheet.length; index++) {
        const 
        everySheet = totalSheet[index], // 每个表格
        {name, data} = everySheet,
        totalRowData = data.splice(parseInt(startRow) - 1).filter(item => item.length !== 0), // 要开始读取数据做渲染的地方（所有行的数据）
        everyRowLengthArr = totalRowData.map(item => item.length),
        maxRowLegth = Math.max(...everyRowLengthArr),
        singleJsonObj = {}, // 每个表格作为一个数据（对象形式）
        totalRowJsonArr = []; // 用来存放excel每行组装成的对象数据（singleRowObj）

        // 检测输入的key长度，与表格的长度是不是相等
        if (userKeys && finalkeys.length < maxRowLegth) {
            console.log();
            Log(`The maximum number of rows in ${Text.infoText('Sheet ' + (index + 1))} is ${Text.infoText(maxRowLegth)}.\nThe number of key values you set is ${Text.infoText(finalkeys.length)}.`, 'warn');
            console.log(chalk.hex('#f5e724')(`The json data will be rendered according to the number of key values you set.`));
            console.log();
        }

        // console.log(totalRowData, 1);

        // 把每行数组组装成对象形式
        for (let index2 = 0; index2 < totalRowData.length; index2++) {
            const 
            singleRowRenderArr = totalRowData[index2], // 每一行的值（形式为数组）
            singleRowObj = {}, // 用对象形式存放每一行的值
            MAXLENGTH = (userKeys && finalkeys.length <= maxRowLegth) ? finalkeys.length : singleRowRenderArr.length, // 以用户输入的-k 长度做渲染
            defalutValue = '';

            // 每行里的每个具体数据
            for (let index3 = 0; index3 < MAXLENGTH; index3++) {
                const value = singleRowRenderArr[index3] || defalutValue;
                const keyValue = userKeys ? finalkeys[index3] : `${finalkeys}_${index3 + 1}`;

                singleRowObj[keyValue] = value;
            }
            
            totalRowJsonArr.push(singleRowObj);
        }

        // 添加每个表格名字
        singleJsonObj.xlsx_name = name;
        singleJsonObj.data = totalRowJsonArr;

        finalJsonArr.push(singleJsonObj);
    }

    // console.log(finalJsonArr);

    // 输出json文件
    finalJsonArr.forEach((item, index) => {
        let 
        pathName = `${finalOutPath}`,
        fileName = '';

        if (userJsonName && finalJsonName[index]) {
            fileName = `${finalJsonName[index]}.json`;
        }
        else {
            fileName = `${Config.defaultPrefixJsonName}_${index + 1}.json`;
            // console.log(fileName);
        }

        fs.outputJsonSync(`${pathName}/${fileName}`, item);
        table.push([fileName, pathName]);
    });


    // 打印最后的json文件地址
    Log('Json data generated successfully.', 'success');
    console.log(table.toString());
}

// 获取excel模板文件
function getTemplate(option) {
    const
    cliPath = __dirname, // ejc-cli 命令执行所在的文件
    originalTemplate = fs.readdirSync(path.resolve(cliPath, `../template/`))[0],
    table = new Table({ 
        head: [Text.infoText('excel file name'), Text.infoText('File location')]
    });

    try {
        let pathName = '';

        if (!option) {
            pathName =  path.resolve('./', Config.defaultOutTemplateName);
        }
        else {
            pathName = path.resolve('./', option);
        }

        fs.copySync(path.resolve(cliPath, `../template/`), `${path.resolve('./', pathName)}`);

        Log('Excel template file obtained successfully', 'success');
        table.push([originalTemplate, pathName]);
        console.log(table.toString());

    } catch (err) {
        log(err, 'error');
    }
}


module.exports = {
    convertToJson,
    getTemplate
};