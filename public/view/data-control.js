module.exports = (function () {

    var data = null;

    var getDataFromServer = (selectedList) => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3d';

        console.log(url, resolve, reject, selectedList);
        // $.post(url, { list: selectedList }).done(function(responseJson) {
        //     console.log(responseJson);
        //     resolve(responseJson);
        // });
    });

    var getSourceCodeFromServer = (originalId) => new Promise(function (resolve, reject) {
        var filter = '?originalId=' + encodeURI(originalId);
        var url = location.origin + '/api/Visualization/SourceCode' + filter;

        console.log(url, resolve, reject, originalId);
        // $.get(url, function(responseJson) {
        //     resolve(responseJson);
        // });
    });

    var getTaskProjectDataFilterFromServer = () => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3dTaskProjectFilter';

        console.log(url, resolve, reject);
        // $.get(url, function (responseJson) {
        //     console.log(responseJson);
        //     resolve(responseJson);
        // });
    });

    var getUserDataFilteFromServer = (selectedList) => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3dUserFilter';

        console.log(url, resolve, reject, selectedList);
        // $.post(url, { list: selectedList }).done(function (responseJson) {
        //     console.log(responseJson);
        //     resolve(responseJson);
        // });
    });

    var getSessionDataFilteFromServer = (selectedList) => new Promise(function (resolve, reject) {
        var url = location.origin + '/api/Visualization/View3dSessionFilter';

        console.log(url, resolve, reject, selectedList);
        // $.post(url, { list: selectedList }).done(function (responseJson) {
        //     console.log(responseJson);
        //     resolve(responseJson);
        // });
    });

    return {
        data: data,
        getDataFromServer: getDataFromServer,
        getSourceCodeFromServer: getSourceCodeFromServer,
        getTaskProjectDataFilterFromServer: getTaskProjectDataFilterFromServer,
        getUserDataFilteFromServer: getUserDataFilteFromServer,
        getSessionDataFilteFromServer: getSessionDataFilteFromServer
    };

}());