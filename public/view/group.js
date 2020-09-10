/* eslint-disable */
var Group = function (groupId, maxIndexWidthQuantity, sessionsQuantity) {

    maxIndexWidthQuantity++;

    var group = new Rectangle(config.groupWidthBase * maxIndexWidthQuantity, ((config.groupHeightBase + config.shadowMarginY) * sessionsQuantity), window.frame.light, window.frame.darker)
        .addTo(view.container);

    var margin = config.groupMargin;

    var groupBeforeX = 0;
    var groupBeforeWidth = 0;
    
    if (groupId > 0) {
        groupBeforeX = view.groups[groupId - 1].x;
        groupBeforeWidth = view.groups[groupId - 1].width;
    } else {
        margin = 0;
    }

    var movOnX = groupBeforeX + groupBeforeWidth + margin;
    var movOnY = movOnX;

    group.pos(movOnX, movOnY);

    group.sessionsQuantity = sessionsQuantity;

    view.groups.push(group);

    group.rot(45);

    group.sessionDistanceChange = function (val) {
        var marginY = val;

        group.heightOnly = ((config.groupHeightBase + marginY) * group.sessionsQuantity); 
    };

    view.sliderGroupDistances.on("change", function () {
        group.rot(0);

        var margin = view.sliderGroupDistances.currentValue;

        var groupBeforeX = 0;
        var groupBeforeWidth = 0;

        if (groupId > 0) {
            groupBeforeX = view.groups[groupId - 1].x;
            groupBeforeWidth = view.groups[groupId - 1].width;
        } else {
            margin = 0;
        }

        var movOnX = groupBeforeX + groupBeforeWidth + margin;
        var movOnY = movOnX;

        group.pos(movOnX, movOnY);

        group.rot(45);
    });
}