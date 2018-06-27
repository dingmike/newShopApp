
/**
 *
 * http://www.anotherhome.net
 * Copyright 2015, DIYgod
 * Free to use under the MIT license.
 *
 */
(function ($) {


    var nowTimer='';

    $.carrousel = function (options, element) {
        this.$el = $(element);
        this._init(options);
    };

    $.carrousel.defaults = {
        current: 0,	// index of current item
        autoplay: true,// slideshow on / off
        interval: 3000, // time between transitions
        swiperCallback:function () {
            
        },
        timeRangFetch:function () {

        }
    };

    $.carrousel.prototype = {
        // 初始化
        _init: function (options) {
            debugger
        }
    };

    $.fn.carrousel = function (options) {
        if (typeof options === 'object') {
            this.each(function () {
                var instance = $.data(this, 'carrousel');
                if (!instance) {
                    $.data(this, 'carrousel', new $.carrousel(options, this));
                }
            });
        }
        else if (typeof options === 'string') {
            this.each(function () {
                var instance = $.data(this, 'carrousel');
                if (instance) {
                    switch (options) {
                        case 'play':
                            instance._startSlideshow();
                            instance.options.autoplay = true;
                            break;
                        case 'stop':
                            instance._stopSlideshow();
                            instance.options.autoplay = false;
                            break;
                        case 'next':
                            instance._navigate('next');
                            break;
                        case 'prev':
                            instance._navigate('prev');
                            break;
                    }
                }
            });
        }
        else if (typeof options === 'number') {
            this.each(function () {
                var instance = $.data(this, 'carrousel');
                instance.button[options].click();
            });
        }
        return this;
    };

})(jQuery);