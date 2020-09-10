/* eslint-disable */
var FileShadow = function (sessionIndex, groupId, groupIndex) {

    var shadow = new Rectangle(config.shadowWidth, 10, window.frame.red, window.frame.darker).addTo(view.container);

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

    shadow.sessionDistanceChange = function (val) {
        shadow.rot(0);

        view.currentSessionDistance = val;

        var marginY = view.currentSessionDistance;

        if (shadow.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * shadow.sessionIndex;
        }

        var movOnX = view.groups[shadow.groupId].x + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) - marginY;
        var movOnY = view.groups[shadow.groupId].y + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) + marginY;

        shadow.pos(movOnX, movOnY);

        shadow.rot(45);
    };

    shadow.groupDistanceChange = function () {
        shadow.rot(0);

        var marginY = view.currentSessionDistance;

        if (shadow.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * shadow.sessionIndex;
        }

        var movOnX = view.groups[shadow.groupId].x + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) - marginY;
        var movOnY = view.groups[shadow.groupId].y + ((config.shadowWidth + config.shadowMargin) * shadow.groupIndex) + marginY;

        shadow.pos(movOnX, movOnY);

        shadow.rot(45);
    };
}