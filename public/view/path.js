/* eslint-disable */
var Path = function (sessionIndex) {

    var points = [];

    loop(window.parent.dataControl.data.sessions[sessionIndex].pathnodes.length, function (p) {
        points.push([ window.parent.dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.x, window.parent.dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.y ]);
    });

    window.zog(points);

    var path = new Squiggle({
        controlType: "none", move: false, allowToggle: false, lockControlType: true, lockControls: true, showControls: false,
        thickness: 1, color: window.frame.dark,
        points: points
    }).addTo(view.container);

    view.paths.push(path);

    //new Circle(10, red).addTo().animate({path:line}, 3000);

    view.sliderSessionDistances.on("change", function () {

        var points = [];

        loop(window.parent.dataControl.data.sessions[sessionIndex].pathnodes.length, function (p) {
            points.push([window.parent.dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.x, window.parent.dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.y]);
        });

        path.points = points;
    });

    view.sliderGroupDistances.on("change", function () {
        var points = [];
        loop(window.parent.dataControl.data.sessions[sessionIndex].pathnodes.length, function (p) {
            points.push([window.parent.dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.x, window.parent.dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.y]);
        });

        path.points = points;
    });
}