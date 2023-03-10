
<div align="center">
<!-- <div>
    <h1>ejc-cli<h1>
</div> -->

<img src="./media/logo.svg?v=1" width="70%">

<!-- ## **`ejc-cli`** -->
让可视化的excel表格，更好的管理你的json数据

![vsersion](https://img.shields.io/npm/v/ejc-cli) 
![download](https://img.shields.io/npm/dm/ejc-cli)
![license](https://img.shields.io/npm/l/ejc-cli)

</div>


## 介绍
> `ejc-cli`，前三个字母由`excel`、`json`、`cli`三个单词首字母组成。

我们项目有时为了省去了后端的开发成本，会把一些数据直接用个`json`文件存在本地，然后再用这些数据来做渲染。但是当我们的数据多了，维护一个冗长的`json`文件可能会很费力，而且这些`json`文件也只能在开发人员中传播。

excel中每一行可以当做是一条数据，这样excel比起`json`文件，可以更加可视化，更加条理的管理我们的数据。所以我们可以用excel表格来收集我们的数据，然后再通过`ejc-cli`这个工具输出开发人员用到的`json`文件。

**这样有个最大的好处就是，我们的数据不但可以在开发人员中传播，非开发人员可以用excel传播**，大大提高了工作效率，加强了不同人员间的的合作。

## 使用步骤
1. 安装工具
    ````npm
    npm i ejc-cli -g
    ````
2. 获取模板excel文件  
    你不需要自己做一个excel表格，这里已经做好了一个模板excel，你只需要执行：
    ````npm
    ejc-cli gt
    ````
    或者指定保存的目录：
    ````npm
    ejc-cli gt './xlsx_template/'
    ````
    这样我们就能获取到一个excel模板文件了，然后把里面的数据换成你想要的就好了，对就这么简单。
3. 输出我们的`json`文件  
   ````npm
    ejc-cli -i './xlsx_template/template.xlsx' -k 'num, name, desc, director, link' -n 'movieData, novelData'
    ````

## 注意事项
在使用过程中，这里有以下注意事项：
- 生成`json`数据时，请确保`-s`的值是否正确。`-s`代表的是，数据从excel第几行开始读取，默认是第3行
- 当设置`-k`值的个数小于excel表格的列数时，会以`-k`值的个数做渲染  
  你可以试试执行以下命令，看看输出的数据有什么区别
  ````npm
  ejc-cli -i './xlsx_template/template.xlsx' -k 'num, name' -n 'movieData, novelData'
  ````
  这时输出的`json`数据只有`id`，`author`两个值

## 选项及命令
````npm
Usage: ejc-cli [options] [command]

=> Manage your json data better with visual excel sheets

Options:
  -v                        View current version
  -i, --input [path]        Path of excel to be converted
  -o, --output [path]       Path to the output json file
  -n, --json-name [string]  Name of the output json file
  -k, --keys [string]       The key value corresponding to each row of each sheet
  -s, --start-row [number]  Read data from what row of excel
  -h, --help                View help

Commands:
  gt [path]                 Get the excel template file
````

### 选项
| 参数 | 是否必须  | 说明 | 默认值
| ---| --- | --- | --- |
| `-v` | 否 | 查看当前版本 
| `-i` | 是 | 要转换的excel表格所在路径
| `-o` | 否 | `json`文件输出路径 | 当前目录的`xlsx_json`文件夹下
| `-n` | 否 | 输出的`json`文件名字 | 默认以excel里面的sheet数量索引命名（`data_1.json, data_2.json`）
| `-k` | 否 |`excel`表格中每行对应要设置的`key`值名称 | 默认会以当前每行的索引作为`key`（`{key_1: ''}, {key_2: ''}`）
| `-s` | 否 | 从excel表格中哪一行开始读取数据  | `3`
| `-h` | 否 | 查看帮助  |

### 命令
| 语句 | 参数 | 说明
| ---|  --- |  --- |
| `gt` | `path` | `path`为获取的模板excel文件保存目录。当`path`为空时，获取的模板excel文件默认保存在当前目录的`xlsx_template`文件夹下

## 讲解
我们可以看看获取到的模板excel文件（`template.xlsx`）结构：  

![structure_cn](./media/structure_cn.png)

表格的总体结构一般分三块（`top`，`middle`，`bottom`）：
- 第一块，我们称它为（`T`），指整个表格的大标题
- 第二块，我们称它为（`M`），对表格每列信息的概述，也是用来设置对应的`key`值的（`-k 'id, author, desc, director, link'`）
- 第三块，我们称它为（`B`），它所在的行数，就是程序要开始读取数据的行数（`-s 4`）

## 如何使用自己的excel表格
虽然我们强烈建议你用使用我们模板excel文件（`template.xlsx`）来管理数据，但是这个文件也许样式不一定能满足你。  

所以如果你想`diy`表格的样式，根据“讲解”模块的分析，**请保证`M`与`B`模块结构与上图的表格相似。**
