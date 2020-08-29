var view = require('../../public/view/view');
var dataControl = require('../../public/view/dataControl');

module.exports = function (sessionIndex) {

    var points = [];

    window.zim.loop(dataControl.data.sessions[sessionIndex].pathnodes.length, function (p) {
        points.push([ dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.x, dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.y ]);
    });

    window.zim.zog(points);

    var path = new window.zim.Squiggle({
        controlType: "none", move: false, allowToggle: false, lockControlType: true, lockControls: true, showControls: false,
        thickness: 1, color: window.frame.dark,
        points: points
    }).addTo(view.container);

    view.paths.push(path);

    //new Circle(10, red).addTo().animate({path:line}, 3000);

    view.sliderSessionDistances.on("change", function () {

        var points = [];

        window.zim.loop(dataControl.data.sessions[sessionIndex].pathnodes.length, function (p) {
            points.push([dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.x, dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.y]);
        });

        path.points = points;
    });

    view.sliderGroupDistances.on("change", function () {
        var points = [];
        window.zim.loop(dataControl.data.sessions[sessionIndex].pathnodes.length, function (p) {
            points.push([dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.x, dataControl.data.sessions[sessionIndex].pathnodes[p].eventView.y]);
        });

        path.points = points;
    });
}