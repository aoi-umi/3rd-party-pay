const path = require('path');
const fs = require('fs');
const utils = require('../utils');

const columnMap = {
    参数: 'varName',
    参数名称: 'name',
    类型: 'type',
    是否必填: 'required',
    必填: 'required',
    是否可为空: 'canNull',
    最大长度: 'maxLength',
    描述: 'desc',
    参数说明: 'desc',
    示例值: 'example',
    范例: 'example',
    样例: 'example',

    错误码: 'errorCode',
    错误描述: 'desc',
    解决方案: 'resolve',

    通知类型: 'notifyType',
    默认开启: 'enable'
};

let tradeMenu = {
    "name": "支付API",
    "slug": "api_1",
    "pages": [{
        "currentPath": "1", "depth": 1, "rootPath": "1", "slug": "alipay.trade.close", "title": "统一收单交易关闭接口"
    }, {
        "currentPath": "2", "depth": 1, "rootPath": "2", "slug": "koubei.trade.order.consult", "title": "口碑订单预咨询"
    }, {
        "currentPath": "3", "depth": 1, "rootPath": "3", "slug": "alipay.trade.create", "title": "统一收单交易创建接口"
    }, {
        "currentPath": "4", "depth": 1, "rootPath": "4", "slug": "alipay.trade.pay", "title": "统一收单交易支付接口"
    }, {
        "currentPath": "5", "depth": 1, "rootPath": "5", "slug": "koubei.trade.itemorder.query", "title": "口碑商品交易查询接口"
    }, {
        "currentPath": "6", "depth": 1, "rootPath": "6", "slug": "koubei.trade.itemorder.buy", "title": "口碑商品交易购买接口"
    }, {
        "currentPath": "7", "depth": 1, "rootPath": "7", "slug": "koubei.trade.itemorder.refund", "title": "口碑商品交易退货接口"
    }, {
        "currentPath": "8", "depth": 1, "rootPath": "8", "slug": "koubei.trade.ticket.ticketcode.send", "title": "码商发码成功回调接口"
    }, {
        "currentPath": "9", "depth": 1, "rootPath": "9", "slug": "koubei.trade.ticket.ticketcode.delay", "title": "口碑凭证延期接口"
    }, {
        "currentPath": "10", "depth": 1, "rootPath": "10", "slug": "koubei.trade.ticket.ticketcode.cancel", "title": "口碑凭证码撤销核销"
    }, {
        "currentPath": "11", "depth": 1, "rootPath": "11", "slug": "koubei.trade.ticket.ticketcode.query", "title": "口碑凭证码查询"
    }, {
        "currentPath": "12", "depth": 1, "rootPath": "12", "slug": "koubei.trade.order.precreate", "title": "口碑订单预下单"
    }, {
        "currentPath": "13", "depth": 1, "rootPath": "13", "slug": "mybank.payment.trade.order.create", "title": "网商银行全渠道收单业务订单创建"
    }, {
        "currentPath": "14", "depth": 1, "rootPath": "14", "slug": "alipay.pcredit.huabei.auth.settle.apply", "title": "花呗先享会员结算申请"
    }, {
        "currentPath": "15", "depth": 1, "rootPath": "15", "slug": "alipay.trade.page.pay", "title": "统一收单下单并支付页面接口"
    }, {
        "currentPath": "16", "depth": 1, "rootPath": "16", "slug": "alipay.fund.auth.order.freeze", "title": "资金授权冻结接口"
    }, {
        "currentPath": "17", "depth": 1, "rootPath": "17", "slug": "alipay.trade.refund", "title": "统一收单交易退款接口"
    }, {
        "currentPath": "18", "depth": 1, "rootPath": "18", "slug": "alipay.trade.fastpay.refund.query", "title": "统一收单交易退款查询"
    }, {
        "currentPath": "19", "depth": 1, "rootPath": "19", "slug": "alipay.trade.advance.consult", "title": "交易垫资咨询"
    }, {
        "currentPath": "20", "depth": 1, "rootPath": "20", "slug": "alipay.trade.orderinfo.sync", "title": "支付宝订单信息同步接口"
    }, {
        "currentPath": "21", "depth": 1, "rootPath": "21", "slug": "alipay.trade.page.refund", "title": "统一收单退款页面接口"
    }, {
        "currentPath": "22", "depth": 1, "rootPath": "22", "slug": "alipay.trade.wap.pay", "title": "手机网站支付接口2.0"
    }, {
        "currentPath": "23", "depth": 1, "rootPath": "23", "slug": "alipay.trade.query", "title": "统一收单线下交易查询"
    }, {
        "currentPath": "24", "depth": 1, "rootPath": "24", "slug": "alipay.trade.precreate", "title": "统一收单线下交易预创建"
    }, {
        "currentPath": "25", "depth": 1, "rootPath": "25", "slug": "alipay.trade.app.pay", "title": "app支付接口2.0"
    }, {
        "currentPath": "26", "depth": 1, "rootPath": "26", "slug": "alipay.trade.cancel", "title": "统一收单交易撤销接口"
    }, {
        "currentPath": "27", "depth": 1, "rootPath": "27", "slug": "alipay.trade.order.settle", "title": "统一收单交易结算接口"
    }].filter(ele => ele.slug.startsWith('alipay.trade')),
};
let fundMenu = {
    "name": "资金API",
    "slug": "api_28",
    pages: [{
        "currentPath": "1", "depth": 1, "rootPath": "1", "slug": "alipay.fund.auth.operation.detail.query", "title": "资金授权操作查询接口"
    }, {
        "currentPath": "2", "depth": 1, "rootPath": "2", "slug": "alipay.fund.auth.operation.cancel", "title": "资金授权撤销接口"
    }, {
        "currentPath": "3", "depth": 1, "rootPath": "3", "slug": "alipay.fund.auth.order.freeze", "title": "资金授权冻结接口"
    }, {
        "currentPath": "4", "depth": 1, "rootPath": "4", "slug": "alipay.fund.auth.order.unfreeze", "title": "资金授权解冻接口"
    }, {
        "currentPath": "5", "depth": 1, "rootPath": "5", "slug": "alipay.fund.trans.toaccount.transfer", "title": "单笔转账到支付宝账户接口"
    }, {
        "currentPath": "6", "depth": 1, "rootPath": "6", "slug": "alipay.fund.trans.order.query", "title": "查询转账订单接口"
    }, {
        "currentPath": "7", "depth": 1, "rootPath": "7", "slug": "alipay.fund.trans.refund", "title": "资金退回接口"
    }, {
        "currentPath": "8", "depth": 1, "rootPath": "8", "slug": "alipay.fund.trans.app.pay", "title": "现金红包无线支付接口"
    }, {
        "currentPath": "9", "depth": 1, "rootPath": "9", "slug": "alipay.fund.auth.order.app.freeze", "title": "线上资金授权冻结接口"
    }, {
        "currentPath": "10", "depth": 1, "rootPath": "10", "slug": "alipay.fund.auth.order.voucher.create", "title": "资金授权发码接口"
    }, {
        "currentPath": "11", "depth": 1, "rootPath": "11", "slug": "alipay.fund.account.query", "title": "支付宝资金账户资产查询接口"
    }, {
        "currentPath": "12", "depth": 1, "rootPath": "12", "slug": "alipay.fund.batch.create", "title": "批次下单接口"
    }, {
        "currentPath": "13", "depth": 1, "rootPath": "13", "slug": "alipay.fund.batch.detail.query", "title": "批量代发明细统一查询接口"
    }, {
        "currentPath": "14", "depth": 1, "rootPath": "14", "slug": "alipay.fund.trans.common.query", "title": "转账业务单据查询接口"
    }, {
        "currentPath": "15", "depth": 1, "rootPath": "15", "slug": "alipay.fund.trans.uni.transfer", "title": "统一转账接口"
    }].filter(ele => ele.slug.startsWith('alipay.fund.trans')),
};
let doc = 'https://docs.open.alipay.com';

let dict = {
    pay: tradeMenu,
    fund: fundMenu,
    notify: {
        slug: '',
        pages: [{
            slug: '/194/103296',
            key: 'notify'
        }]

    }
};

async function run() {
    for (let key in dict) {
        let menu = dict[key];
        let pages = menu.pages;
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            try {
                // if (![0].includes(i))
                //     return;
                let url = [doc, menu.slug, page.slug].join('/');
                let name = utils.toHyphen(page.key || page.slug);
                let parseData = await utils.parse(url, columnMap);
                // console.log(parseData);
                let dir = path.resolve(__dirname, '../../_test/_output/ali');
                utils.mkdirsSync(dir);
                let file = parseData.map(ele => utils.convertToClass(ele)).join('\n\n');
                file = `//${url}\n`
                    + `//${utils.toCamelCase(page.slug)}: '${page.slug}'\n\n`
                    + file;
                fs.writeFileSync(dir + `/${name}.ts`, file);
            } catch (e) {
                console.log(page);
                console.error(e);
            }
        }
    }
}
run();