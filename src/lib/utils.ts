import axios, { AxiosRequestConfig } from 'axios';
import * as Q from 'q';
import * as md from 'node-forge/lib/md.all';
import * as hmac from 'node-forge/lib/hmac';

export function extend(...args) {
    var res = args[0] || {};
    for (let i = 1; i < args.length; i++) {
        var arg = args[i];
        if (typeof (arg) !== 'object') {
            continue;
        }
        for (var key in arg) {
            if (arg[key] !== undefined)
                res[key] = arg[key];
        }
    }
    return res;
}

export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function request(options: AxiosRequestConfig) {
    if (!options.url)
        throw new Error('url can not empty!');
    let opt: AxiosRequestConfig = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },
        method: 'POST',
    };
    if (options.headers) {
        opt.headers = extend({}, opt.headers, options.headers);
        delete options.headers;
    }
    opt = extend(opt, options);

    if (opt.method.toLowerCase() == 'get')
        opt.params = opt.data;

    return axios.request(opt);
}

export function randomString() {
    return Math.random().toString(36).substr(2);
}

export function sortObject<T extends Object>(obj: T) {
    const sort = {} as T;
    Object.keys(obj).sort().forEach(function (key) {
        sort[key] = obj[key];
    });
    return sort;
}

export let promisify = function <T = any>(fn, caller?) {
    if (caller)
        fn = fn.bind(caller);
    return Q.denodeify<T>(fn);
};

export function encrypt(str: string, type: 'md5' | 'sha256' = 'md5', key?: string) {
    let encrypt = md.md5;
    let isHmac = false;
    if (type == 'sha256') {
        encrypt = hmac;
        isHmac = true;
    }
    let en = encrypt.create();
    if (isHmac)
        en.start(type, key);
    en.update(str, 'utf8');
    return en.digest().toHex();
}

export function dateFormat(date?: string | number | Date, format = 'yyyy-MM-dd HH:mm:ss') {
    if (!date)
        date = new Date();
    else if (typeof date == 'number' || typeof date == 'string')
        date = new Date(date);

    var o = {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours() % 12,
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        S: date.getMilliseconds()
    };

    var formatStr = format.replace(/(y+|M+|d+|h+|H+|m+|s+|S+)/g, function (e) {
        let key = e.slice(-1);
        if (key == 'S')
            return ('' + o[key]).slice(0, e.length);
        else
            return ((e.length > 1 ? '0' : '') + o[key]).slice(-(e.length > 2 ? e.length : 2));
    });
    return formatStr;
};