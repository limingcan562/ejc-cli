
<div align="center">
<div>
    <h1>ejc-cli<h1>
</div>

<p>让可视化的excel表格，更好的管理你的json数据</p>

![vsersion](https://img.shields.io/npm/v/ejc-cli) 
![download](https://img.shields.io/npm/dm/ejc-cli)
![license](https://img.shields.io/npm/l/ejc-cli)

</div>


## 介绍
我们平时代码中都会用`json`文件来管理我们的数据。但是当我们的数据多了，维护一个冗长的`json`文件可能会很费力。

因此我们可以用可视化的excel表格，更加条理，清晰的管理我们的数据。再用这个`ejc-cli`这个工具输出我们的`json`文件。`excel`表格同时也方便我们其他合作者使用传播。


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

## 选项
| 参数 | 是否必须  | 说明 | 默认值
| ---| --- | --- | --- |
| `-v` | 否 | 查看当前版本 
| `-i` | 是 | 要转换的excel表格所在路径
| `-o` | 否 | `json`文件输出路径 | 当前目录的`xlsx_json`文件夹下
| `-k` | 否 |`excel`表格中每行对应要设置的`key`值名称 | 默认会以当前每行的索引作为`key`（`{key_1: ''}, {key_2: ''}`）
| `-s` | 否 | 从excel表格中哪一行开始读取数据  | `4`
| `-h` | 否 | 查看帮助  |

## 命令
| 语句 | 参数 | 说明
| ---|  --- |  --- |
| `gt` | `path` | `path`为获取的模板excel文件保存目录。当`path`为空时，获取的模板excel文件默认保存在当前目录的`xlsx_template`文件夹下

## 使用步骤
1. 安装工具
    ````npm
    npm i ejc-cli -g
    ````
2. 获取模板excel文件
    这里已经做好了一个模板excel，你只需要执行：
    ````npm
    ejc-cli gt './excel/'
    ````
    这样我们就能获取到一个excel模板文件了，然后把里面的数据换成你想要的就好了，对就这么简单。