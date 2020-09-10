/* eslint-disable */
window.loadSession = function (selectedSessions) {
    window.parent.dataControl.getDataFromServer(selectedSessions).then(function (dataFromServer) {
        data = dataFromServer;

        cleanView();

        loadView();
    });

    function cleanView() {
        view.cleanView();
        
        window.frame.stage.removeAllChildren();
        window.frame.stage.update();
    }

    function loadView() {
        view.initView();

        loop(data.groups.length, function (i) {
            new Group(data.groups[i].groupId, data.groups[i].maxIndexWidthQuantity, data.sessions.length);
        });

        loop(data.sessions.length, function (s) {
            loop(data.sessions[s].files.length, function (f) {
                var fileData = data.sessions[s].files[f];

                new File(s, fileData.events.length, fileData.groupId, fileData.groupIndex);

                new FileShadow(s, fileData.groupId, fileData.groupIndex);

                loop(fileData.events.length, function (e) {
                    new Event(e, f, s, fileData.groupId, fileData.groupIndex);
                });
            });

            new Path(s);
        });

        window.frame.stage.update();
    }
}

window.initCanvasView = function () {

    var scaling = "full";
    var color = light;
    var outerColor = darker;

    window.frame = new Frame({ scaling, color, outerColor, retina: true });
    frame.on("ready", function () {

        var stage = frame.stage;

        frame.outerColor = '#444';
        frame.color = '#ddd';

        view.initView();

        stage.update();
    });
}

window.changeZoom = function (val) {
    view.container.sca(2 * val, val);
    window.frame.stage.update();
};

window.centralizeTo = function(width, height) {
    if(view.container == undefined)
        return;

    view.container.loc(width, height);
    window.frame.stage.update();
};

window.changeSessionDistance = function(val) {
    view.files.forEach(e => {
        e.sessionDistanceChange(val);
    });

    view.events.forEach(e => {
        e.sessionDistanceChange(val);
    });

    view.shadows.forEach(e => {
        e.sessionDistanceChange(val);
    });

    view.groups.forEach(e => {
        e.sessionDistanceChange(val);
    });

    view.paths.forEach(e => {
        e.sessionDistanceChange();
    });

    window.frame.stage.update();
};