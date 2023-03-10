
<div align="center">
<h1>ejc-cli</h1>
<p>让可视化的excel表格，更好的管理你的json数据</p>

![vsersion](https://img.shields.io/npm/v/ejc-cli) 
![download](https://img.shields.io/npm/dm/ejc-cli)
![license](https://img.shields.io/npm/l/ejc-cli)


</div>


## 介绍
我们平时代码中都会用`json`文件来管理我们的数据。但是当我们的数据多了，维护一个冗长的`json`文件可能会很费力。因此我们可以用可视化的excel表格，更加条理，更加清晰的管理我们的数据。再用这个`ejc-cli`这个工具输出我们的`json`文件。`excel`表格同时也方便我们其他合作者使用传播。

## 安装
````npm
npm i ejc-cli -g
````
## 选项
| 参数 | 说明 | 是否必须 | 默认值
| ---| --- | --- | --- |
| `-v` | 查看当前版本 | 否 
| `-i` | 要转换的excel表格所在路径 | 是
| `-o` | `json`文件输出路径 | 否 | 当前目录的`xlsx_json`文件夹下
| `-k` | `excel`表格中每行对应要设置的`key`值名称 | 否 | 默认会以当前索引作为`key`（`{key_1: ''}, {key_2: ''}`）
| `-s` | 从excel表格中哪一行开始读取数据 | 否 | `4`
| `-h` | 查看帮助 | 否 |

## 命令
| 语句 | 可跟参数 | 说明 
| ---| --- | --- | 
| `gt` |  保存的路径  | `get template`的简写。获取excel表格模板文件，如果后面有地址，则会保存到相应地址；否则保存到当前目录的`xlsx_template`文件夹中

### 例如：
获取excel模板文件并保存到当前`template`文件夹下：
````npm
ejc-cli gt './template/'
````
