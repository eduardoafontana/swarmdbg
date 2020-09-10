/* eslint-disable */
var Path = function (sessionIndex) {

    var points = [];

    loop(data.sessions[sessionIndex].pathnodes.length, function (p) {
        points.push([ data.sessions[sessionIndex].pathnodes[p].eventView.x, data.sessions[sessionIndex].pathnodes[p].eventView.y ]);
    });

    var path = new Squiggle({
        controlType: "none", move: false, allowToggle: false, lockControlType: true, lockControls: true, showControls: false,
        thickness: 1, color: window.frame.dark,
        points: points
    }).addTo(view.container);

    view.paths.push(path);

    //new Circle(10, red).addTo().animate({path:line}, 3000);

    path.sessionDistanceChange = function () {
        var points = [];

        loop(data.sessions[sessionIndex].pathnodes.length, function (p) {
            points.push([data.sessions[sessionIndex].pathnodes[p].eventView.x, data.sessions[sessionIndex].pathnodes[p].eventView.y]);
        });

        path.points = points;
    };

    path.groupDistanceChange = function () {
        var points = [];
        loop(data.sessions[sessionIndex].pathnodes.length, function (p) {
            points.push([data.sessions[sessionIndex].pathnodes[p].eventView.x, data.sessions[sessionIndex].pathnodes[p].eventView.y]);
        });

        path.points = points;
    };
}