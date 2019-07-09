const cheerio = require('cheerio');
const axios = require('axios').default;
const path = require('path');
const fs = require('fs');
const utils = require('../utils');

const columnMap = {
    字段名: 'name',
    名称: 'name',
    变量名: 'varName',
    必填: 'required',
    类型: 'type',
    示例值: 'example',
    描述: 'desc',
    说明: 'desc',
    原因: 'reason',
    解决方案: 'resolve',
    错误码: 'errorCode',
    支付状态: 'payStatus',
};

async function parse(url) {
    let rs = await axios.get(url);
    let html = rs.data;
    // console.log(html);

    const $ = cheerio.load(html);
    let table = $('table');
    let parseData = [];
    let notMatch = {};
    table.each(function (i) {
        let trs = $(this).find('tr');
        let headers = trs.slice(0, 1).children();
        let colName = [];
        headers.each(function (i) {
            let text = $(this).text().trim();
            if (text.startsWith('-'))
                text = text.substr(1);
            colName[i] = columnMap[text];
            if (!colName[i])
                throw new Error('no match column ' + text);
        });
        let dist = {};
        trs.slice(1).each(function (row) {
            let data = {};
            let tds = $(this).find('td');
            if (tds.length && colName.length == tds.length) {
                colName.forEach((ele, idx) => {
                    data[colName[idx]] = $(tds[idx]).text().trim();
                });
                if (!data.type)
                    data.errorCode = data.name;
                if (data.errorCode)
                    dist[data.errorCode] = data;
                else
                    dist[data.varName] = data;
            } else {
                if (!notMatch[i + 1])
                    notMatch[i + 1] = [];
                notMatch[i + 1].push(row + 1);
            }
        });
        if (Object.keys(dist).length)
            parseData.push(dist);
    });
    if (Object.keys(notMatch).length) {
        console.log(url);
        console.log(`不符合格式` + Object.entries(notMatch).map(([key, val]) => { return key + ':' + val.join(',') }).join(';'));
    }
    return parseData;
}

function getType(type) {
    if (/string/i.test(type))
        return 'string';
    if (/^(u?)int/i.test(type))
        return 'number';
    return 'unknow';
}

function convertToClass(data, clsName) {
    let cls = [];
    let isError = false;
    for (let key in data) {
        let val = data[key];
        let col = [];
        let returnLine = /\n\s+/;
        if (isError || val.errorCode) {
            isError = true;
            col.push(`${val.errorCode}: {`);
            col.push(`code: '${val.errorCode}',`);
            col.push(`desc: '${val.desc.replace(returnLine, ';')}',`);
            col.push(`resolve: '${val.resolve.replace(returnLine, ';')}',`);
            col.push(`payStatus: '${val.payStatus || ''}',`);
            col.push(`},`);
        } else {
            col.push('/**');
            col.push(' *' + val.name);
            col = [...col, ...val.desc.split(returnLine).map(ele => {
                return ' *' + ele;
            })];
            col.push(' *example: ' + val.example);
            col.push(' */');
            col.push(`${val.varName}${val.required == '否' ? '?' : ''}: ${getType(val.type)};`);
        }
        cls.push(col.join('\n'));
    }
    cls.unshift(isError ? 'let error = {' : `class ${clsName || ''} {`);
    cls.push('}');
    return cls.join('\n\n');
}

[
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_2',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11&index=3',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_4',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_5',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_18&index=7',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14&index=8',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=9',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_16&index=10',
    'https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_17&index=11',
].forEach(async (url, i) => {
    try {
        // if (![8].includes(i))
        //     return;
        let parseData = await parse(url);
        // console.log(parseData);
        let dir = path.resolve(__dirname, '../../_test/_output/wx');
        utils.mkdirsSync(dir);
        let file = parseData.map(ele => convertToClass(ele)).join('\n\n');
        file = '//' + url + '\n\n' + file;
        fs.writeFileSync(dir + `/${i + 1}.ts`, file);
    } catch (e) {
        console.log(url);
        console.error(e);
    }
});

