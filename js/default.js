// JavaScript Document//存储本地缓存// var token = localStorage.getItem("token");var token = localStorage.getItem("token");var root = 'http://47.92.97.86:8081';var frontLoaclHost = 'https://www.goego.cn'; // 手动配置前端分享地址var alipayApp = '/front/payInfo/aliPay?token='; // 支付宝app支付 '/front/payInfo/aliPayWeb?token='; // 支付宝h5支付//var ajaxUrl = 'http://192.168.100.12:8080/shop';//var ajaxUrl = 'http://192.168.100.220:8086/shop';//yc// var wrUrl = 'http://ouhui.tunnel.qydev.com/muban';// var wrUrl = 'http://ysy.tunnel.qydev.com/muban';// var wrUrl = 'http://181368v1r5.imwork.net/muban';var wrUrl = 'http://116.62.130.132:8082/muban';// var wrUrl = 'http://ysy.yiqigo.top/muban';// var wrUrl = 'http://yangxiao.tunnel.qydev.com/muban';// var wrUrl = 'http://localhost:8080/muban';// var wrUrl = 'http://yangxiaoa.free.ngrok.cc/muban';// var ajaxUrl = 'http://192.168.0.105:8070/shop';var ajaxUrl = 'http://ouhui.tunnel.qydev.com/shop';// var ajaxUrl = 'http://181368v1r5.imwork.net:42580/shop';// var ajaxUrl = 'http://yangxiao.free.ngrok.cc/shop';// var ajaxUrl = 'http://www.goegomall.cn:8080/shop';// var ajaxUrl = 'http://181368v1r5.imwork.net/shop';// var ajaxUrl = 'http://ysy.tunnel.qydev.com/shop';// var ajaxUrl = 'http://ysy.yiqigo.top/shop';// var ajaxUrl = 'https://goego.cn';// var ajaxUrl = 'http://116.62.130.132:8080/shop';   //oh http://yangxiao.tunnel.qydev.com/shop///// var ajaxUrl = 'http://yangxiao.tunnel.qydev.com/shop'; //oh// var ajaxUrl = 'http://192.168.16.185:8081/shop/';//oh// var ajaxUrl = 'http://goegochina.cn';//oh// var ajaxUrl = 'http://localhost:8080/shop';//oh// var ajaxUrl = 'http://yangxiaoa.free.ngrok.cc/shop';//oh// var ajaxUrl = 'http://alanfront.tunnel.qydev.com/shop';//oh//var ajaxUrl = 'http://39.104.60.138:8080/shop';//function getLoginToken() {//	return localStorage.getItem("token");//}////var token="ace07c52dc6139093180b4b226cbf540";//function setLoginToken(user) {//	localStorage.setItem("token", user);//}//分页初始化变量var obj = '.content',    totalheight = '',    listLoading = false,    listLoadingLock = false,    currentpage = 0;//请求参数var listparam = {    'pageNo': currentpage,    'pageSize': 10};/*数据请求 obj：内容填充对象 objtpl：内容填充 type：请求方式 url：请求接口 listparam，param：请求参数 callback:数据回调 *///针对需要分页的数据类型function getList(obj, type, url, listparam, callback) {    if (!listLoadingLock) {        currentpage = parseInt(currentpage);        if (currentpage === 0) {            currentpage = 1;            $(obj).html('');        }        //http wait        listLoading = true;        $.ajax({            type: type,            url: url,            data: listparam,            dataType: 'json',            success: function (r) {                //console.log(r)                if (r.code == 201) {                    tip.flag('请先登录', 'error');                    setTimeout(function () {                        location.href = './login.html';                    }, 2000);                } else if (r.code == 200) {                    listLoading = false;                    callback(obj, r);                } else if (r.code == 300){                    // tip.flag(r.msg, 'error');                    /*layer.open({                        content: r.msg                        ,skin: 'msg'                        ,time: 2 //2秒后自动关闭                    });*/                    callback(obj, r);                }            },            error: function (err) {                tip.flag(err, 'error');            }        })    }}//针对获取信息的数据类型function getInfo(type, url, param, callback) {    $.ajax({        type: type,        url: url,        data: param,        dataType: 'json',        success: function (r) {debugger            if (r.code == 201) {                tip.flag('请先登录', 'error');                setTimeout(function () {                    location.href = './login.html';                }, 2000);            } else if (r.code == 200) {                callback(r);            } else {                callback(r);                // tip.flag(r.msg, 'error');                //layer.msg(r.msg)            }        },        error: function (err) {            tip.flag(err, 'error');        }    })}//后台专用function getL(obj, type, url, params, callback) {    $.ajax({        type: type,        url: url,        data: params,        dataType: 'json',        success: function (r) {            //console.log(r)            if (r.code == 201) {                tip.flag('请先登录', 'error');                setTimeout(function () {                    location.href = './login.html';                }, 2000);            } else if (r.code == 200 || r.code == 300) {                callback(obj, r);            } else {                // callback(obj, r);                //tip.flag(r.msg, 'error');            }        },        error: function (err) {            tip.flag(err, 'error');        }    })}//滚动加载更多function scrollMore(obj, objtpl, type, url, listparam, dataobj) {    $(obj).scroll(function () {        totalheight = parseFloat($(obj).height()) + parseFloat($(obj).scrollTop());        if ($(obj).height() <= totalheight && !listLoading) {            ++currentpage;            getList(obj, objtpl, type, url, listparam, dataobj);        }    });}/*提示框 content:提示内容 icon:显示图标（success，error） */var tip = {    flag: function (content, icon) {        var width = 120;        var height = 110;        var icon = 'img/' + icon + '.png';        var node = $("<div class='_tiping' style='background-image:url(" + icon + ") '>" + content + "</div>");        $('body').append(node);        node.css({            left: ($(window).width() - width) / 2-20,            top: ($(window).height() - height) / 2,            height: height,            lineHeight: height + 60 + 'px'        });        $('._tiping').fadeOut(3000, function () {            $('._tiping').remove();        });    }};/*获取地址栏参数 name:地址栏参数名 */function GetUrlString(name) {    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");    var r = window.location.search.substr(1).match(reg);    if (r != null) return unescape(r[2]);    return '';}function GetUrlParam(paraName) {    var url = document.location.toString();    var arrObj = url.split("?");    if (arrObj.length > 1) {        var arrPara = arrObj[1].split("&");        var arr;        for (var i = 0; i < arrPara.length; i++) {            arr = arrPara[i].split("=");            if (arr != null && arr[0] == paraName) {                return arr[1];            }        }        return "";    }    else {        return "";    }}function GetQueryString(name){    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");    var url = decodeURIComponent(window.location);    var r = url.substr(1).match(reg);    if(r!=null)return  unescape(r[2]); return null;}//时间格式化function formatDateTime(date) {    var y = date.getFullYear();    var m = date.getMonth() + 1;    m = m < 10 ? ('0' + m) : m;    var d = date.getDate();    d = d < 10 ? ('0' + d) : d;    var h = date.getHours();    h = h < 10 ? ('0' + h) : h;    var minute = date.getMinutes();    minute = minute < 10 ? ('0' + minute) : minute;    var second = date.getSeconds();    second = second < 10 ? ('0' + second) : second;    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;}//关联显示function connectDisplay(obj, type, val) {    // obj: 所有选择对象类名，id名    // type: 所有选择对象的属性值    // val: 要选择的属性值    $(obj).each(function () {        if ($(this).attr(type) == val) {            $(this).css("display", "block");        } else {            $(this).css("display", "none");        }    })}function getFxId(callback) {    $.ajax({        type: 'GET',        url: ajaxUrl + '/front/clients/queryFxAll',        async: false,        dataType: 'json',        success: function (res) {            var fxIdData = [];            for(var i=0; i<res.length; i++){                var obj={};                fxIdData.push({id: res[i].id, mine:res[i].mine});            }        callback(fxIdData);        },        error: function (err) {            tip.flag(err, 'error');        }    })}function setupWebViewJavascriptBridge(callback) {    //iOS使用    if (window.WebViewJavascriptBridge) {        return callback(WebViewJavascriptBridge);    }    if (window.WVJBCallbacks) {        return window.WVJBCallbacks.push(callback);    }    window.WVJBCallbacks = [callback];    var WVJBIframe = document.createElement('iframe');    WVJBIframe.style.display = 'none';    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';    document.documentElement.appendChild(WVJBIframe);    setTimeout(function () {        document.documentElement.removeChild(WVJBIframe)    }, 0)    //Android使用    if (window.WebViewJavascriptBridge) {        return callback(WebViewJavascriptBridge)    } else {        document.addEventListener(            'WebViewJavascriptBridgeReady',            function () {                return callback(WebViewJavascriptBridge)            },            false        );    }}var head = document.head || document.getElementsByTagName('head')[0];head.append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />');var pageAll = {//后台所有分页    yu: '', //总页数    chang: function (pageType, obj, type, url, listparam, callback) { //上一页，下一页        if (pageType === '0') { //上一页            listparam.pageNo -= 1;            if (listparam.pageNo <= 0) {                layer.msg('没有上一页了！', {                    time: 1000,                });                listparam.pageNo = 1;            } else {                getL(obj, type, url, listparam, callback);            }        } else if (pageType === '1') { //下一页            listparam.pageNo += 1;            if (listparam.pageNo > pageAll.yu) {                layer.msg('没有下一页了！', {                    time: 1000                });                listparam.pageNo = pageAll.yu;            } else {                getL(obj, type, url, listparam, callback);            }        } else if (pageType === '2') { //初始请求            getL(obj, type, url, listparam, callback);        }    },    writeTotal: function (pageNo, pageSize, count) { //打印出总页数和当前页数        pageAll.yu = parseInt(count / pageSize);        if (count % pageSize != 0) {            pageAll.yu += 1;        }        var pageHtml = '<a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">';        pageHtml += pageNo + '/' + pageAll.yu        pageHtml += '</a>';        $("#DataTables_Table_0_paginate").find('span').html(pageHtml);    }}