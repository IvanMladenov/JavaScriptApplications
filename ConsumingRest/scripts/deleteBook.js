var app = app||{};

(function(scope){
    function deleteBook() {
        var id = $(this).parent().attr('book-id');
        scope.requester.deleteBook(
            id,
            function () {
                scope.listBooks();
            },
            function (err) {
                console.log(err);
            }
        );
    };

    scope.deleteBook = deleteBook;
})(app);

