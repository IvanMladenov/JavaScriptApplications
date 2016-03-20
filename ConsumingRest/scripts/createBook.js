var app = app||{};

(function(scope){
    var createBook = function () {
        var book = {
            'name': $('#name').val(),
            'author': $('#author').val(),
            'isbn': $('#isbn').val()
        };

        scope.requester.createBook(book, function () {
            scope.listBooks()
        }, function (err) {
            console.error(err);
        });
    };

    scope.createBook = createBook;
})(app);

