
const path = require('path');
const fs = require('fs');
const utils = require('../utils');

const columnMap = {
    字段名: 'name',
    名称: 'name',
    字段: 'varName',
    变量名: 'varName',
    必填: 'required',
    类型: 'type',
    示例值: 'example',
    描述: 'desc',
    说明: 'desc',
    错误描述: 'desc',
    原因: 'reason',
    解决方案: 'resolve',
    解决方式: 'resolve',
    错误码: 'errorCode',
    错误代码: 'errorCode',
    支付状态: 'payStatus',
};

let docUrl = 'https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_';
let urls = Array.from(new Array(18).keys()).map(ele => docUrl + (ele + 1));
let dict = {
    // pay: urls,
    transfer: [
        //红包
        'https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_4',
        'https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5',
        'https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6',
        //企业付款
        'https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2',
        'https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3',
    ]
};

async function run() {
    for (let key in dict) {
        let urls = dict[key];
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            try {
                // if (![8].includes(i))
                //     return;
                let parseData = await utils.parse(url, columnMap);
                // console.log(parseData);
                let dir = path.resolve(__dirname, '../../_test/_output/wx');
                utils.mkdirsSync(dir);
                let file = parseData.map(ele => utils.convertToClass(ele)).join('\n\n');
                file = '//' + url + '\n\n' + file;
                fs.writeFileSync(dir + `/${key + (i + 1)}.ts`, file);
            } catch (e) {
                console.log(url);
                console.error(e);
            }
        }
    }
}
run();

