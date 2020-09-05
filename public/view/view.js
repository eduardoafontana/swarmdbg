/* eslint-disable */
var view =  (function () {

    var container = null;
    var sliderSessionDistances = null;
    var sliderGroupDistances = null;

    var groups = [];
    var files = [];
    var shadows = [];
    var events = [];
    var paths = [];
    var sessions = [];

    var initView = function () {

        this.container = new Container(400, 400);
        this.container.center();
        this.container.sca(2, 1);
        this.container.gesture();

        this.sliderSessionDistances = new Slider({ min: 1, max: 35, step: 1, vertical: true, button: new Rectangle(20, 10, window.frame.light, window.frame.darker) }).pos(50, 10);
        this.sliderSessionDistances.currentValue = config.shadowMarginY;

        this.sliderGroupDistances = new Slider({ min: 1, max: 35, step: 1, vertical: true, button: new Rectangle(20, 10, window.frame.light, window.frame.darker) }).pos(150, 10);
        this.sliderGroupDistances.currentValue = config.groupMargin;
    };

    return {
        initView: initView,
        container: container,
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