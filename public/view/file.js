var config = require('../../public/view/config');
var view = require('../../public/view/view');

module.exports = function (sessionIndex, numberOfEvents, groupId, groupIndex) {

    if (view.sessions[sessionIndex] == undefined)
        view.sessions.push({ points: [], events: [] });

    var height = config.fileHeightBase * numberOfEvents;

    var file = new window.zim.Rectangle(config.fileWidth, height, window.frame.green, window.frame.dark)
        .ske(0, -45.5)
        .addTo(view.container);

    var marginYfile = config.fileMarginY;

    if (sessionIndex == 0) {
        marginYfile = 0;
    } else {
        marginYfile = marginYfile * sessionIndex;
    }

    file.groupId = groupId;
    file.groupIndex = groupIndex;
    file.sessionIndex = sessionIndex;

    var movOnX = view.groups[groupId].x + ((config.fileWidth + config.fileMargin) * groupIndex) - marginYfile;
    var movOnY = view.groups[groupId].y + ((config.fileWidth + config.fileMargin) * groupIndex) + marginYfile - config.fileTopBase;

    file.pos(movOnX, movOnY);

    view.files.push(file);


    view.sliderSessionDistances.on("change", function () {
        var marginY = view.sliderSessionDistances.currentValue;

        if (file.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * file.sessionIndex;
        }

        var movOnX = view.groups[file.groupId].x + ((config.fileWidth + config.fileMargin) * file.groupIndex) - marginY;
        var movOnY = view.groups[file.groupId].y + ((config.fileWidth + config.fileMargin) * file.groupIndex) + marginY - config.fileTopBase;

        file.pos(movOnX, movOnY);
    });


    view.sliderGroupDistances.on("change", function () {
        var marginY = view.sliderSessionDistances.currentValue;

        if (file.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * file.sessionIndex;
        }

        var movOnX = view.groups[file.groupId].x + ((config.fileWidth + config.fileMargin) * file.groupIndex) - marginY;
        var movOnY = view.groups[file.groupId].y + ((config.fileWidth + config.fileMargin) * file.groupIndex) + marginY - config.fileTopBase;

        file.pos(movOnX, movOnY);
    });
}