/* eslint-disable */
window.loadViewData = function (selectedSessions) {

    var scaling = "full";
    var color = light;
    var outerColor = darker;

    window.frame = new Frame({ scaling, color, outerColor, retina: true });
    frame.on("ready", function () {

        var stage = frame.stage;

        frame.outerColor = '#444';
        frame.color = '#ddd';

        view.initView();

        window.parent.dataControl.getDataFromServer(selectedSessions).then(function (dataFromServer) {
            data = dataFromServer;

            loadView();
        });

        function loadView() {
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

            stage.update();
        }

        view.sliderZoom.on("change", function () {
            view.container.sca(2 * view.sliderZoom.currentValue, view.sliderZoom.currentValue);
        });

        view.container.loc(450, 400);

        stage.update();
    });
  }