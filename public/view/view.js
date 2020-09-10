/* eslint-disable */
var view =  (function () {

    var container = null;
    var currentSessionDistance = config.shadowMarginY;

    var groups = [];
    var files = [];
    var shadows = [];
    var events = [];
    var paths = [];
    var sessions = [];

    var initView = function () {

        this.container = new Container(1, 1);
        this.container.center();
        this.container.sca(2, 1);
        this.container.gesture();
    };

    var cleanView = function () {
        this.container = null;
        this.groups = [];
        this.files = [];
        this.shadows = [];
        this.events = [];
        this.paths = [];
        this.sessions = [];
    };

    return {
        initView: initView,
        cleanView: cleanView,
        container: container,
        currentSessionDistance: currentSessionDistance,

        groups: groups,
        files: files,
        shadows: shadows,
        events: events,
        paths: paths,
        sessions: sessions
    };
})();