/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.downCount = function (options, callback) {
        var timeRange = '3/15/2018 00:00:00';
        if($(this).attr('data-clock')){
            timeRange = parseInt($(this).attr('data-clock'));
            console.log('timeRange: ' + timeRange)
        }
        var settings = $.extend({
                date: format(new Date(timeRange), 'yy/mm/dd HH:mm:ss'),
                offset: null
            }, options);

        // 加载进度条
        if(settings.loadingTiao&&!settings.isDetailProduct&&!settings.loadingAdTiao){
            if($(this)[0]){
                var loadId = $(this).parent().parent().next().find('.status-msg-h')[0].id;
                var statusDom = $(this).parent().parent().next().find('.status-msg-h');
                var bili = toPercent((statusDom.attr('data-last')/statusDom.attr('data-total')).toFixed(2));
                statusDom.append('<style>#'+loadId+':after{width:'+ bili +'}</style>');
            }

        }

        // 线下加载进度条
        if(settings.loadingTiao&&settings.loadingOffline){
            if($(this)[0]){
                var loadId = $(this).parent().parent().find('.status-msg-h')[0].id;
                var statusDom = $(this).parent().parent().next().find('.status-msg-h');
                var bili = toPercent((statusDom.attr('data-last')/statusDom.attr('data-total')).toFixed(2));
                statusDom.append('<style>#'+loadId+':after{width:'+ bili +'}</style>');
            }

        }

        if(settings.pdLoading){
            if($(this).parent().next().find('.status-msg')[0]){
                var loadId = $(this).parent().next().find('.status-msg')[0].id;
                var statusDom =  $(this).parent().parent().children().find('.status-msg');
                var bili = toPercent(statusDom.attr('data-last')/statusDom.attr('data-total'));
                statusDom.append('<style>#'+loadId+':after{width:'+ bili +'}</style>');
            }

        }

        if(settings.loadingAdTiao){
            if($(this)[0]){
                var loadId = $(this).parent().next().find('.status-msg')[0].id;
                var statusDom = $(this).parent().next().find('.status-msg');
                var bili = toPercent((statusDom.attr('data-last')/statusDom.attr('data-total')).toFixed(2));
                statusDom.append('<style>#'+loadId+':after{width:'+ bili +'}</style>');
            }

        }

        if(settings.loadingTiao&&settings.isDetailProduct){
            var statusDom =  $(this).parent().parent().find('.status-msg');
            var bili = toPercent((statusDom.attr('data-last')/statusDom.attr('data-total')).toFixed(2));
            statusDom.attr('text',bili);
            statusDom.append('<style>.status-msg:after{width:'+ bili +'}</style>');
        }
        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset));

            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // calculate dates
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                // fix dates so that it will show two digets
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording
            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';

            // set to DOM
            container.find('.days').text(days);
            container.find('.hours').text(parseInt(hours) + 24*parseInt(days));
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(parseInt(ref_hours) + 24*parseInt(ref_days));
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        }
        
        // start
        var interval = setInterval(countdown, 1000);
    };
    //时间格式化
    function format(date,str){
        var mat={};
        mat.M=date.getMonth()+1;//月份记得加1
        mat.H=date.getHours();
        mat.s=date.getSeconds();
        mat.m=date.getMinutes();
        mat.Y=date.getFullYear();
        mat.D=date.getDate();
        mat.d=date.getDay();//星期几
        mat.d=check(mat.d);
        mat.H=check(mat.H);
        mat.M=check(mat.M);
        mat.D=check(mat.D);
        mat.s=check(mat.s);
        mat.m=check(mat.m);
        // console.log(typeof mat.D)
        // console.log(mat.M+"/"+mat.D+"/"+mat.Y+" "+mat.H+":"+mat.m+":"+mat.s)
        if(str.indexOf(":")>-1){
            mat.Y=mat.Y.toString().substr(2,2);
            // return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+":"+mat.m+":"+mat.s;
            return mat.M+"/"+mat.D+"/"+mat.Y+" "+mat.H+":"+mat.m+":"+mat.s;
        }
        if(str.indexOf("/")>-1){
            // return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+"/"+mat.m+"/"+mat.s;
            // console.log(mat.M+"/"+mat.D+"/"+mat.Y+" "+mat.H+"/"+mat.m+"/"+mat.s)
            return mat.M+"/"+mat.D+"/"+mat.Y+" "+mat.H+"/"+mat.m+"/"+mat.s;
        }
        if(str.indexOf("-")>-1){
            return mat.Y+"-"+mat.M+"-"+mat.D+" "+mat.H+"-"+mat.m+"-"+mat.s;
        }
    }
    //检查是不是两位数字，不足补全
    function check(str){
        str=str.toString();
        if(str.length<2){
            str='0'+ str;
        }
        return str;
    }
    function toPercent(data){
        var strData = parseFloat(data)*100;
        var ret = strData.toString()+"%";
        return ret;
    }

})(jQuery);