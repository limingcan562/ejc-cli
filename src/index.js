const
xlsx = require('node-xlsx'),
fs = require('fs-extra'),
path = require('path'),
// {successLog, errorLog, warnLog, infoLog} = require('./log/index'),
config = require('./config/index'),
{trim} = require('./tool/index');
const { infoText, successText } = require('./text'),
log = require('./log/index'); 

// 将excel转换成json
function convertToJson(options, spinner) {
    /**
     * @options 用户终端输入的指令
     * @originalXlsxData 最原始的excel表格数据
     * @totalSheet 去掉空的 originalXlsxData 内可能存在的空数据
     * @totalSheetNum 总共有几个表（去掉空的sheet，有些表格里面没东西）
     * @finalOutPath 输出的json文件地址
     * @finalkeys excel每行对应的key
     * @finalJsonName 输出的json文件名
     * @finalJsonArr 用来存放生成的每条json数据的容器
     */

    const 
    {input: userInput, output: userOut, keys: userKeys, startRow, jsonName: userJsonName} = options,
    originalXlsxData = xlsx.parse(`${path.resolve('.', userInput)}`),
    totalSheet = originalXlsxData.filter(item => item.data.length !== 0),
    totalSheetNum = totalSheet.length,
    finalOutPath = userOut || config.defaluOutPath,
    finalkeys = userKeys ? trim(keys).split(',') : config.prefixKeyName,
    finalJsonName = trim(userJsonName) ? userJsonName.split(',') : config.prefixJsonName,
    finalJsonArr = [],
    finalPathNameArr = [];

    log('json数据生成中...', 'start');

    // 最外层
    for (let index = 0; index < totalSheet.length; index++) {
        const 
        everySheet = totalSheet[index], // 每个表格
        {name, data} = everySheet,
        totalRowData = data.splice(startRow - 1).filter(item => item.length !== 0), // 要开始读取数据做渲染的地方（所有行的数据）
        singleJsonObj = {}, // 每个表格作为一个数据（对象形式）
        totalRowJsonArr = []; // 用来存放excel每行组装成的对象数据（singleRowObj）


        // 把每行数组组装成对象形式
        for (let index2 = 0; index2 < totalRowData.length; index2++) {
            const 
            singleRowRenderArr = totalRowData[index2], // 每一行的值（形式为数组）
            singleRowObj = {}; // 用对象形式存放每一行的值

            // 每行里的每个具体数据
            for (let index3 = 0; index3 < singleRowRenderArr.length; index3++) {
                const value = singleRowRenderArr[index3];

                // 用户设置了keys
                if (userKeys) {
                    singleRowObj[finalkeys[index3]] = value;
                }
                // 用户没设置，用自己prefixKeyName
                else {
                    singleRowObj[`${finalkeys}_${index3 + 1}`] = value;
                }
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
        // finalJsonName
        // 用户设置了输出的json名
        let pathName = '';
        
        if (userJsonName) {
            pathName = `${finalOutPath}/${finalJsonName[index]}.json`;
            fs.outputJsonSync(`${finalOutPath}/${finalJsonName[index]}.json`, item);
        }
        else {
            pathName = `${finalOutPath}/${config.prefixJsonName}_${index + 1}.json`;
        }

        fs.outputJsonSync(pathName, item);
        finalPathNameArr.push(pathName);
    });
    log('json数据生成成功', 'success');


    // finalPathNameArr.forEach(item => {
    //     log(`json数据地址为 ${item}`, 'info');
    // });
}

// 获取excel模板文件
function getTemplate(option) {
    const
    cliPath = __dirname, // ejc-cli 命令执行所在的文件
    currentProjectPath = path.resolve('.'); // 用户当前终端打开项目所在目录
    
    try {
        // 没有参数时候，excel模板文件，默认输出到用户当前项目根目录下
        if (!option) {
            fs.copySync(path.resolve(cliPath, `../${config.templateName}`), `${currentProjectPath}/${config.defaultOutTemplateName}`);
        }
        // 有参数时，将excel模板文件输出到用户设定的目录下
        else {
            fs.copySync(path.resolve(cliPath, `../${config.templateName}`), `${currentProjectPath}/${option}`);
        }
        log('模板excel获取成功', 'success');
    } catch (err) {
        log(err, 'error');
    }
}


module.exports = {
    convertToJson,
    getTemplate
};