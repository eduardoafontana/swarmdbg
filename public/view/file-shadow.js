var config = require('../../public/view/config');
var view = require('../../public/view/view');

module.exports = function (sessionIndex, groupId, groupIndex) {

    var shadow = new window.zim.Rectangle(config.shadowWidth, 10, window.frame.red, window.frame.darker).addTo(view.container);

    var marginY = config.shadowMarginY;

    if (sessionIndex == 0) {
        marginY = 0;
    } else {
        marginY = marginY * sessionIndex;
    }

    shadow.groupId = groupId;
    shadow.groupIndex = groupIndex;
    shadow.sessionIndex = sessionIndex;

    var movOnX = view.groups[groupId].x + ((config.shadowWidth + config.shadowMargin) * groupIndex) - marginY;
    var movOnY = view.groups[groupId].y + ((config.shadowWidth + config.shadowMargin) * groupIndex) + marginY;

    shadow.pos(movOnX, movOnY);

    shadow.rot(45);

    view.shadows.push(shadow);


    view.sliderSessionDistances.on("change", function () {
        shadow.rot(0);

        var marginY = view.sliderSessionDistances.currentValue;

        if (shadow.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * shadow.sessionIndex;
        }

        var movOnX = view.groups[shadow.groupId].x + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) - marginY;
        var movOnY = view.groups[shadow.groupId].y + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) + marginY;

        shadow.pos(movOnX, movOnY);

        shadow.rot(45);
    });

    view.sliderGroupDistances.on("change", function () {
        shadow.rot(0);

        var marginY = view.sliderSessionDistances.currentValue;

        if (shadow.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * shadow.sessionIndex;
        }

        var movOnX = view.groups[shadow.groupId].x + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) - marginY;
        var movOnY = view.groups[shadow.groupId].y + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) + marginY;

        shadow.pos(movOnX, movOnY);

        shadow.rot(45);
    });
}