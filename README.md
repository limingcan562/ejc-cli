
<div align="center">

<img src="./media/logo.svg?v=1" width="70%">

Manage your `json` data better with visual Excel sheets

![npm](https://img.shields.io/npm/v/ejc-cli?logo=npm)
![download](https://img.shields.io/npm/dm/ejc-cli)
![license](https://img.shields.io/npm/l/ejc-cli)

English | [简体中文](./READEME_zh-CN.md)

</div>

## Effect preview

Template `Excel` files：

![Template `Excel` files](./media/template_excel.png)

Usage effect:

![Usage effect](./media/preview.gif)

Output `json` data:

![Output `json` data](./media/effects.png)

## Introduction
> `ejc-cli`, the first three letters of which consist of the initials `excel`, `json`, `cli`.

### Practical issues
Sometimes, in order to save back-end development costs, we use `json` files to store some data locally, and then use these data for rendering. However:

- If there are too many pages or modules that require data, the corresponding `json` files will also increase. There are too many files and data is too fragmented, making managing so many files difficult
- When the amount of data is large, the data can become very lengthy, and it is difficult to directly find a specific piece of data
- Sometimes `json` is not a good way to spread our data when we want to share it with other non developers

### Why choose Excel to manage data
- More convenient operation. Excel is a professional office software. Adding, deleting, modifying, and querying data in Excel is of course much more convenient than modifying it in our editor
- More visual. Each sheet can be used as data for a certain page or module; The name of each sheet is the name of our json; Each row of data in the sheet is the data of each of our `json`
- More convenient management. The data is integrated into an Excel file, making it easier for us to manage the data of all modules or pages
- More suitable for dissemination. `json` is not suitable for dissemination among non developers, but Excel is suitable for all people. Not only can non developers modify this Excel, but if you find a problem in Excel, you can also modify it and then sync it to others.

### Tools are born
Therefore, in order to solve the above problems and combine the comprehensive advantages of Excel, `ej-cli` was born, so you only need to focus on managing the Excel file.


## Quick start
### 1. Installation tools
````npm
npm i ejc-cli -g
````
### 2. Get the template excel file
You don't need to make an excel sheet yourself, a template excel file is already made here, you just need to execute:
````npm
ejc-cli gt
````
Or save the template file to the specified directory:
````npm
ejc-cli gt './xlsx_template/'
````
This will give us access to an excel template file, then just replace the data in it with what you want, yes it's that simple.
### 3. Exporting `json` files
> You can go to the [Explanation](#Explanation) module for a better understanding of `-k`, `-s`
- Setting `-k`, `-s` output using the global method   

    If you have more than one `sheet` in your excel file and they have a similar structure (like the two `sheets` in the `template.xlsx` file), then you can simply set:
    ````npm
    ejc-cli -i './xlsx_template/template.xlsx' -k 'order,title,date,director,genre,cast,money' -s 3 -n 'movieData,songData'
    ````
    In this case, `ejc-cli` will read the data from `row 3` of all `sheets` and the `key` values of all the output `json` data will be `order, title, date, director, genre, cast, money`.

- Set `-k`, `-s` output separately 

    If you have more than one `sheet` in your excel file, and each `sheet` does not always start reading data from `line 3`, and each `sheet` does not always have the same `key` value, then you can use the "`|`" splitter:
    ````npm
    ejc-cli -i './xlsx_template/template.xlsx' -k 'order,title,date|num,song_title,artist' -s '3|4' -n 'movieData,songData'
    ````
    In this case, `ejc-cli` will read the data of the first `sheet` starting from `line 3`, and the `json` data key value of the first `sheet` will be `order, title, date`.  
    `ejc-cli` will read the data of the second `sheet` starting from `line 4`, and the `json` data key values of the second `sheet` are `num, song_title, artist`
- Integrate into your project  
  - Configure relevant commands in `package.json`: 
    ```json 
    {
      "script": {
        "get:data": "ejc-cli -i ./xlsx_template/template.xlsx -k \"order,title,date|num,song_title,artist\" -s \"2|3\" -n 'movieData,songData'"
      }
    }
    ````
  - Run the relevant `scrpit` command to output the data: 
    ```npm
    npm run get:data
    ```

## Notice
Here are the following caveats in use.
- When generating `json` data, make sure that the value of `-s` is correct. `-s` means that the data is read from the first row of each `sheet`, the default is `row 3`.
- When the number of `-k` values is set to less than the number of columns in the `sheet`, it will render with the number of `-k` values  
  
  You can try running the following command to see the difference in the output data
  ````npm
  ejc-cli -i './xlsx_template/template.xlsx' -k 'order,title' -n 'movieData,novelData'
  ````
  The output of the `json` data is only `order` and `title` values
- When integrating `ejc-cli` into your project: 
  - All statements can be made without `'` single quotes
  - **When using the `|` delimiter, please use the escape character for compatibility with different systems. (`2|3` => `\"2|3\"`)**


## Options and commands
````npm
Usage: ejc-cli [options] [command]

=> Manage your json data better with visual excel sheets

Options:
  -v                        View current version
  -i, --input [path]        Path of excel to be converted
  -o, --output [path]       Path to the output json file
  -n, --json-name [string]  Name of the output json file
  -k, --keys [string]       The key value corresponding to each column of each sheet
  -s, --start-row [number]  Read data from what row of sheet
  -h, --help                View help

Commands:
  gt [path]                 Get the excel template file
````

### Options
| Parameters | Required | Default | Description | Supplementary
| ---| --- | --- | --- | ---
| `-v` | No | | View current version | 
| `-i` | Yes | | Path to the excel sheet to be converted |
| `-o` | No | `xlsx_json` folder in the current directory | `json` file output path |
| `-n` | No | Default `sheet` number index naming</br> (`data_1.json, data_2.json,... `) | Output `json` file name |
| `-k` | No | The default is to use the current index of each column as the `key`.</br>（`[{key_1: ''}, {key_2: ''},...]`） | Each column in the `sheet` corresponds to the name of the `key` value to be set | You can use <code>&#124;</code> to set the `key` of the `json` data exported from each `sheet`
| `-s` | No | `3` | Which row to start reading data from in an excel sheet  |  You can use <code>&#124;</code> to set the row from which each `sheet` is to be read
| `-h` | No | | View Help

### Commands
| Statement | Parameters | Description
| ---|  --- |  --- |
| `gt` | `path` | `path` is the directory where the template excel file is saved.</br>When `path` is empty, the template excel file is saved in the `xlsx_template` folder of the current directory by default

## <a id="Explanation">Explanation</a>
We can look at the structure of the obtained template excel file (`template.xlsx`): 

![structure](./media/structure.png)

The overall structure of the table is generally divided into three blocks (`top`, `middle`, `bottom`).
- The first block, which we call (`T`), refers to the broad heading of the entire table
- The second, which we call (`M`), is an overview of the information in each column of the table and is also used to set the corresponding `key` value (`-k 'order,title,date,director,genre,cast,money'`)
- The third block, which we will call (`B`), is the number of rows in which the program will start reading data (`-s 3`)

## How to use your own excel sheet
Because everyone's production of excel is different, we strongly recommend that you use our template excel file (`template.xlsx`) to manage your data, but this file may not always be styled to suit you.  

So if you want to `DIY` the style of your table, according to the analysis of the [Explanation](#Explanation) module, the following rules need to be followed when `DIY`ing your table:
- The `T` and `M` modules are not required, **but please ensure that the data in your excel file, has the same structure as the `B` module in the above diagram**
- Please ensure that your `-s` values are correct
