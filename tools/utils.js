const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios').default;

const utils = exports;
let mkdirsSync = exports.mkdirsSync = function (dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname), mode)) {
        fs.mkdirSync(dirname, mode);
        return true;
    }
    return false;
}

let getType = exports.getType = function (type) {
    if (/string/i.test(type))
        return 'string';
    if (/^((u?)int)|number|price/i.test(type))
        return 'number';
    if (/boolean/i.test(type))
        return 'boolean';
    if (/Date/i.test(type))
        return 'string';
    return 'unknow';
}

exports.convertToClass = function (data, clsName) {
    let cls = [];
    let isError = false;
    let isNotify = false;
    for (let key in data) {
        let val = data[key];
        let col = [];
        let returnLine = /[\n\r]\s+/;
        let desc = val.desc ? val.desc.replace(returnLine, ';') : '';
        if (isNotify || val.notifyType) {
            isNotify = 'notify';
            col.push(`'${val.notifyType}': {`);
            col.push(`code: '${val.notifyType}',`);
            col.push(`desc: '${desc}',`);
            col.push(`enable: '${val.enable}',`);
            col.push(`},`);
        }
        else if (isError || val.errorCode) {
            isError = 'error';
            let errorKey = val.errorCode;
            if (errorKey.indexOf('.') > -1) {
                errorKey = `'${errorKey}'`;
            }
            col.push(`${errorKey}: {`);
            col.push(`code: '${val.errorCode}',`);
            col.push(`desc: '${desc}',`);
            if (val.resolve)
                col.push(`resolve: '${val.resolve.replace(returnLine, ';')}',`);
            if (val.payStatus)
                col.push(`payStatus: '${val.payStatus}',`);
            col.push(`},`);
        } else {
            col.push('/**');
            if (val.name)
                col.push(' * ' + val.name);
            col = [...col, ...val.desc.split(returnLine).map(ele => {
                return ' * ' + ele;
            })];
            if (val.example)
                col.push(' * example: ' + val.example);
            col.push(' */');
            col.push(`${val.varName}${val.required == '否' || val.canNull == '可空' ? '?' : ''}: ${getType(val.type)};`);
        }
        cls.push(col.join('\n'));
    }
    let cons = isError || isNotify;
    cls.unshift(cons ? `export const ${cons} = {` : `export class ${clsName || ''} {`);
    cls.push('}');
    return cls.join('\n\n');
}

exports.toHyphen = function (str) {
    str = str.replace(/[_\.]([a-zA-Z])/g, function () {
        return '-' + arguments[1].toLowerCase();
    });
    return str[0].toLowerCase() + str.substr(1);
}

exports.toCamelCase = function (str) {
    str = str.replace(/[_\.]([a-zA-Z])/g, function () {
        return arguments[1].toUpperCase();
    });
    return str[0].toLowerCase() + str.substr(1);
}

exports.fixText = function (text) {
    text = text.trim();
    if (text.startsWith('-'))
        text = text.substr(1);
    if (text.startsWith('└'))
        text = text.substr(1).trim();
    return text;
};

exports.parse = async function (url, columnMap) {
    let rs = await axios.get(url);
    let html = rs.data;
    // console.log(html);

    const $ = cheerio.load(html);
    let table = $('table');
    let parseData = [];
    let notMatch = {};

    let repeat = [];
    table.each(function (i) {
        let trs = $(this).find('tr');
        let headers = trs.slice(0, 1).children();
        let colName = [];
        let noMatchColumn = [];
        if (headers.length < 3)
            return;
        headers.each(function (i) {
            let text = utils.fixText($(this).text());
            colName[i] = columnMap[text];
            if (!colName[i]) {
                noMatchColumn.push(text.substr(0, 10).trim());
            }
        });
        if (noMatchColumn.length) {
            console.log('no match column: ' + noMatchColumn.join(','));
            return;
        }
        let dist = {};
        let count = {};
        trs.slice(1).each(function (row) {
            let data = {};
            let tds = $(this).find('td');
            if (tds.length && colName.length == tds.length) {
                colName.forEach((ele, idx) => {
                    let text = utils.fixText($(tds[idx]).text());
                    data[colName[idx]] = text;
                });
                if (!data.type && data.name)
                    data.errorCode = data.name;
                if (data.errorCode)
                    dist[data.errorCode] = data;
                else if (data.notifyType)
                    dist[data.notifyType] = data;
                else {
                    let c = count[data.varName];
                    let suffix = '';
                    if (c) {
                        c = ++count[data.varName];
                        suffix = '_' + c;
                    } else {
                        count[data.varName] = 1;
                    }
                    let varName = data.varName + suffix;
                    // data.varName = varName;
                    dist[varName] = data;
                }
            } else {
                if (!notMatch[i + 1])
                    notMatch[i + 1] = [];
                notMatch[i + 1].push(row + 1);
            }
        });
        if (Object.keys(dist).length)
            parseData.push(dist);
        let countEnt = Object.entries(count).filter(e => e[1] > 1);
        if (countEnt.length) {
            repeat.push({ table: i, key: countEnt.join(',') });
        }
    });
    // if (repeat.length)
    //     console.log('重复key', url, repeat);
    if (Object.keys(notMatch).length) {
        console.log(url);
        console.log(`不符合格式` + Object.entries(notMatch).map(([key, val]) => { return '表' + key + ':' + val.join(',') }).join(';'));
    }
    return parseData;
}