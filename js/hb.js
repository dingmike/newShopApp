;(function (win, doc, undefined) {

    function hongbao(stacks,domStr) {
        this.domStr = domStr;
        this.NUMBER_OF_LEAVES = stacks || 50;
        this.randomInteger = function (low, high) {
            return low + Math.floor(Math.random() * (high - low));
        };
        this.randomFloat = function (low, high) {
            return low + Math.random() * (high - low);
        };
        this.pixelValue = function (value) {
            return value + 'px';
        };
        this.durationValue = function (value) {
            return value + 's';
        };

    }

    hongbao.prototype = {
        constructor: hongbao,
        init: function () {
            var _self = this;
            /* Get a reference to the element that will contain the leaves */
            var container = doc.getElementById(this.domStr);

            /* Fill the empty container with new leaves */
            try {
                for (var i = 0; i < this.NUMBER_OF_LEAVES; i++) {
                    container.appendChild(_self.createALeaf());
                }
            }
            catch (e) {
            }
        },
        createALeaf: function () {
            var _self = this;
            /* Start by creating a wrapper div, and an empty img element */
            var leafDiv = document.createElement('div');
            var image = document.createElement('img');

            /* Randomly choose a leaf image and assign it to the newly created element */
            image.src = './img/hongbaoImgs/petal' + this.randomInteger(1, 10) + '.png';

            /* Position the leaf at a random location along the screen */
            leafDiv.style.top = this.pixelValue(this.randomInteger(-160, -130));
            leafDiv.style.left = this.pixelValue(this.randomInteger(0, 1420));

            /* Randomly choose a spin animation */
            var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
            /* Set the -webkit-animation-name property with these values */
            leafDiv.style.webkitAnimationName = 'fade, drop';
            leafDiv.style.animationName = 'fade, drop';
            image.style.webkitAnimationName = spinAnimationName;
            image.style.animationName = spinAnimationName;

            /* 随机下落时间 */
            var fadeAndDropDuration = this.durationValue(this.randomFloat(1.2, 3.2));

            /* 随机旋转时间 */
            var spinDuration = this.durationValue(this.randomFloat(3, 4));

            leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
            leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

            // 随机delay时间
            var leafDelay = this.durationValue(this.randomFloat(0, 1));

            leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
            leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
            image.style.webkitAnimationDuration = spinDuration;
            image.style.animationDuration = spinDuration;
            leafDiv.appendChild(image);
            return leafDiv;
        }
    }

    win.hongbao = hongbao;

}(window, document));