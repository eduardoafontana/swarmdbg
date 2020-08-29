var config = require('../../public/view/config');

module.exports = (function () {

    var container = null;
    var sliderZoom = null;
    var sliderSessionDistances = null;
    var sliderGroupDistances = null;

    var groups = [];
    var files = [];
    var shadows = [];
    var events = [];
    var paths = [];
    var sessions = [];

    var initView = function () {

        this.container = new window.zim.Container(400, 400);
        this.container.center();
        this.container.sca(2, 1);
        this.container.gesture();

        this.sliderZoom = new window.zim.Slider({ min: 0.1, max: 5, step: 0.1, vertical: true, button: new window.zim.Rectangle(20, 10, window.frame.light, window.frame.darker) }).pos(100, 10);
        this.sliderZoom.currentValue = 1;

        this.sliderSessionDistances = new window.zim.Slider({ min: 1, max: 35, step: 1, vertical: true, button: new window.zim.Rectangle(20, 10, window.frame.light, window.frame.darker) }).pos(50, 10);
        this.sliderSessionDistances.currentValue = config.shadowMarginY;

        this.sliderGroupDistances = new window.zim.Slider({ min: 1, max: 35, step: 1, vertical: true, button: new window.zim.Rectangle(20, 10, window.frame.light, window.frame.darker) }).pos(150, 10);
        this.sliderGroupDistances.currentValue = config.groupMargin;
    };

    return {
        initView: initView,
        container: container,
        sliderZoom: sliderZoom,
        sliderSessionDistances: sliderSessionDistances,
        sliderGroupDistances: sliderGroupDistances,

        groups: groups,
        files: files,
        shadows: shadows,
        events: events,
        paths: paths,
        sessions: sessions
    };
})();