import axios, { AxiosRequestConfig } from 'axios';
import * as Q from 'q';
import * as crypto from 'crypto';
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
    en.update(str);
    return en.digest().toHex();
}