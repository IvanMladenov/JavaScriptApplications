var app = app||{};

var requester = (function (scope) {
    var baseUrl = "https://baas.kinvey.com/appdata/kid_bk_D2rnp0l/Books",
        contentType = "application/json";

    var makeRequest = function makeRequest(type, url, contentType, data, success, error) {
        $.ajax({
            type: type,
            url: url,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.authToken
            },
            data: data || undefined,
            success: success,
            error: error
        })
    };

    var makeListAllRequest = function makeListAllRequest(success, error) {
        return makeRequest('GET', baseUrl, undefined, undefined, success, error);
    };

    var makeCreateBookRequest = function makeCreateBookRequest(data, success, error) {
        return makeRequest('POST', baseUrl, undefined, data, success, error);
    };

    var makeDeleteBookRequest = function makeDeleteBookRequest(id, success, error) {
        var deleteUrl = baseUrl + '/' + id;
        return makeRequest('DELETE', deleteUrl, undefined, undefined, success, error);
    };

    var getBookById = function getBookById(id, success, error) {
        var requestId = baseUrl + '/' + id;
        return makeRequest('GET', requestId, undefined, undefined, success, error)
    };

    var editBook = function editBook(id, data, success, error) {
        var requestId = baseUrl + '/' + id;
        return makeRequest('PUT', requestId, undefined, data, success, error);
    };

    scope.requester =  {
        listAll: makeListAllRequest,
        createBook: makeCreateBookRequest,
        deleteBook: makeDeleteBookRequest,
        getBookById: getBookById,
        editBook: editBook
    }
})(app);
