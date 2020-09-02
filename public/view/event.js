/* eslint-disable */
var Event = function (fileIndex, realFileIndex, sessionIndex, groupId, groupIndex) {

    //TODO: change realFileIndex for fileIndex

    var event = new Rectangle(config.eventWidth, config.eventHeight, window.frame.red, window.frame.dark).ske(0, -45.5).addTo(view.container);

    var marginYEvent = config.eventMarginY;
    var marginHeight = config.eventMarginHeight;

    if (sessionIndex == 0) {
        marginYEvent = 0;
    } else {
        marginYEvent = marginYEvent * sessionIndex;
    }

    if (fileIndex > 0)
        marginHeight = ((config.eventMarginHeight + config.eventHeight) * fileIndex) + config.eventMarginHeight;

    event.groupId = groupId;
    event.groupIndex = groupIndex;
    event.sessionIndex = sessionIndex;
    event.fileIndex = fileIndex;

    var movOnX = view.groups[groupId].x + ((config.eventWidth + config.eventMargin) * groupIndex) - marginYEvent;
    var movOnY = view.groups[groupId].y + ((config.eventWidth + config.eventMargin) * groupIndex) + marginYEvent
        - config.eventHeightBase
        + marginHeight;

    event.pos(movOnX, movOnY);

    view.events.push(event);

    loop(data.sessions[sessionIndex].pathnodes.length, function (p) {
        if (data.sessions[sessionIndex].pathnodes[p].eventId == data.sessions[sessionIndex].files[realFileIndex].events[fileIndex].eventId) { //TODO: Refactor fileIndex to eventIndex
            data.sessions[sessionIndex].pathnodes[p].eventView = event;
            //TODO: aqui tem um bad smell. O dado original está sendo modificado. O ideal seria modificar a estrutura auxiliar, mas para isto é necessário esta estratégia.
        }
    });


    view.sliderSessionDistances.on("change", function () {

        var marginY = view.sliderSessionDistances.currentValue;
        var marginHeight = config.eventMarginHeight;

        if (event.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * event.sessionIndex;
        }

        if (event.fileIndex > 0)
            marginHeight = ((config.eventMarginHeight + config.eventHeight) * event.fileIndex) + config.eventMarginHeight;

        var movOnX = view.groups[event.groupId].x + ((config.eventWidth + config.eventMargin) * event.groupIndex) - marginY;
        var movOnY = view.groups[event.groupId].y + ((config.eventWidth + config.eventMargin) * event.groupIndex) + marginY
            - config.eventHeightBase
            + marginHeight;

        event.pos(movOnX, movOnY);
    });

    view.sliderGroupDistances.on("change", function () {
        var marginY = view.sliderSessionDistances.currentValue;
        var marginHeight = config.eventMarginHeight;

        if (event.sessionIndex == 0) {
            marginY = 0;
        } else {
            marginY = marginY * event.sessionIndex;
        }

        if (event.fileIndex > 0)
            marginHeight = ((config.eventMarginHeight + config.eventHeight) * event.fileIndex) + config.eventMarginHeight;

        var movOnX = view.groups[event.groupId].x + ((config.eventWidth + config.eventMargin) * event.groupIndex) - marginY;
        var movOnY = view.groups[event.groupId].y + ((config.eventWidth + config.eventMargin) * event.groupIndex) + marginY
            - config.eventHeightBase
            + marginHeight;

        event.pos(movOnX, movOnY);
    });
}