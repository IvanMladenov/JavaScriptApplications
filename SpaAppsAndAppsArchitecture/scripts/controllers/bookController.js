define(['bookModel', 'bookView'], function(model, view){
    return (function () {
        function BookController(model, view) {
            this._model = model;
            this._view = view;
        }

        BookController.prototype.showBooks = function showBooks() {
            var _this = this;
            this._model.getAllBooks()
                .then(function (collection) {
                    _this._view.listAllBooks(collection);
                }).done()
        };

        BookController.prototype.createBook = function createBook(data) {
            var _this = this;
            this._model.addNewBook(data)
                .then(function () {
                    _this.showBooks()
                }).done();
        };

        BookController.prototype.deleteBook = function deleteBook(data) {
            var _this = this;
            this._model.deleteBook(data.id)
                .then(function () {
                    _this.showBooks()
                })

        };

        BookController.prototype.editBook = function editBook(data) {
            var _this = this;
            var bookId = data.bookId,

                book = {
                    name: data.name,
                    author: data.author,
                    isbn: data.isbn
                };

            this._model.updateBook(bookId, book)
                .then(function () {
                    _this.showBooks()
                })
        };

        return new BookController(model, view);
    })();
});
