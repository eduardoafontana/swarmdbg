var axios = require('axios');

module.exports = (function () {

    var getDataFromServer = (selectedList) => new Promise(function (resolve) {
        var url = 'http://swarmdbg.azurewebsites.net/api/Visualization/View3d';

        axios.post(url, { list: selectedList }).then(response => (
            console.log(response.data),
            resolve(response.data)
        ));
    });

    var getSourceCodeFromServer = (originalId) => new Promise(function (resolve, reject) {
        var filter = '?originalId=' + encodeURI(originalId);
        var url = location.origin + '/api/Visualization/SourceCode' + filter;

        console.log('ainda desativado', url, resolve, reject, originalId);
        // $.get(url, function(responseJson) {
        //     resolve(responseJson);
        // });
    });

    var getTaskProjectDataFilterFromServer = () => new Promise(function (resolve) {
        var url = 'http://swarmdbg.azurewebsites.net/api/Visualization/View3dTaskProjectFilter';

        axios.get(url).then(response => (
            // console.log(response.data),
            resolve(response.data)
        ));
    });

    var getUserDataFilteFromServer = (selectedList) => new Promise(function (resolve) {
        var url = 'http://swarmdbg.azurewebsites.net/api/Visualization/View3dUserFilter';

        axios.post(url, { list: selectedList }).then(response => (
            // console.log(response.data),
            resolve(response.data)
        ));
    });

    var getSessionDataFilteFromServer = (selectedList) => new Promise(function (resolve) {
        var url = 'http://swarmdbg.azurewebsites.net/api/Visualization/View3dSessionFilter';

        axios.post(url, { list: selectedList }).then(response => (
            // console.log(response.data),
            resolve(response.data)
        ));
    });

    return {
        getDataFromServer: getDataFromServer,
        getSourceCodeFromServer: getSourceCodeFromServer,
        getTaskProjectDataFilterFromServer: getTaskProjectDataFilterFromServer,
        getUserDataFilteFromServer: getUserDataFilteFromServer,
        getSessionDataFilteFromServer: getSessionDataFilteFromServer
    };

}());