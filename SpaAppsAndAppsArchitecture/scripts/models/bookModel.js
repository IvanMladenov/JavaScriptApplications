var app = app || {};

app.bookModel = (function (){
    function BookModel(requester){
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/Books';
    }

    BookModel.prototype.getAllBooks = function getAllBooks (){
        return this.requester.get(this.serviceUrl, true);
    };

    BookModel.prototype.addNewBook = function addNewBook (book){
        return this.requester.post(this.serviceUrl, book, true);
    };

    BookModel.prototype.updateBook = function updateBook (bookId, data){
        var requestUrl = this.serviceUrl + '/' +  bookId;
        return this.requester.put(requestUrl, data, true);
    };

    BookModel.prototype.deleteBook = function deleteBook (bookId){
        var requestUrl = this.serviceUrl + '/' + bookId;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function(requester){
            return new BookModel(requester);
        }
    }
})();
