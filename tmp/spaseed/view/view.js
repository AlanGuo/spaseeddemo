/*TMODJS:{"version":"1.0.0"}*/
!function(require, exports, module) {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = window.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    if (template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define) define(function() {
        return template;
    }); else if ("undefined" != typeof exports) module.exports = template; else {
        for (var namespaceArray = "spaseedtemplate".split("."), global = window, i = 0; i < namespaceArray.length; i++) {
            var item = namespaceArray[i];
            global[item] = global[item] || {}, global = global[item];
        }
        global.template = template;
    }
    /*v:7*/
    template("dialog/buttonpannel", function($data) {
        "use strict";
        var $utils = this, buttons = ($utils.$helpers, $data.buttons), $each = $utils.$each, $escape = ($data.item, 
        $data.index, $data.$index, $utils.$escape), $out = "";
        return 2 == buttons.length ? ($out += " ", $each(buttons, function(item, index) {
            $out += ' <a data-click-event="', $out += $escape(item.event || "hide"), $out += '" class="btn btn-', 
            $out += $escape(index), $out += '">', $out += $escape(item.text), $out += "</a> ";
        }), $out += " ") : ($out += ' <a data-click-event="', $out += $escape(buttons[0].event || "hide"), 
        $out += '" class="btn btn-1">', $out += $escape(buttons[0].text || "确定"), $out += "</a> "), 
        new String($out);
    }), /*v:8*/
    template("dialog/dialog", '<div class="cont-title"> </div> <div class="cont-wrapper"> <div class="text-content"> </div> </div> <div class="buttonpannel"> </div> '), 
    /*v:6*/
    template("loading", '<p> <span class="load-1"></span> <span class="load-2"></span> <span class="load-3"></span> <span class="load-4"></span> </p>'), 
    /*v:6*/
    template("sidebartemplate", '<div class="header"> </div> <div class="body"> <div class="side-bar" id="sidebar"> </div> <div id="container" class="container"> </div> </div>'), 
    /*v:6*/
    template("topbottomtemplate", '<div id="top"></div> <div id="container" class="scroll-content"></div> <div id="bottom"></div>'), 
    /*v:1*/
    template("weixin/openinbrowser", '<div class="popup-wxshare"><span class="pay-wx">点击右上角，用浏览器打开再支付</span><a class="icon-close"> 点击关闭</a></div>'), 
    /*v:1*/
    template("weixin/share", '<span class="share-wx">点击右上角，分享到朋友圈</span><a class="icon-close"> 点击关闭</a>'), 
    module && (module.exports = template);
}();