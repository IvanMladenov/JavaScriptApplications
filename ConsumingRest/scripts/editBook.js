var app = app||{};

(function(scope){
    function editBook (){
        var getOldData = function getOldData(){
            var id = $(this).parent().attr('book-id');
            scope.requester.getBookById(
                id,
                function (data) {
                    prepareForEdit(id, data.name, data.author, data.isbn)
                },
                function () {
                });
        };

        var prepareForEdit = function prepareForEdit(id, oldName, oldAuthor, oldIsbn) {
            var selector = "[book-id=" + id + "]";
            $(selector).empty()
                .append($('<label>').attr('for', 'current-name').text('Name'))
                .append($('<input>').attr('id', 'current-name').val(oldName))
                .append($('<label>').attr('for', 'current-author').text('Author'))
                .append($('<input>').attr('id', 'current-author').val(oldAuthor))
                .append($('<label>').attr('for', 'current-isbn').text('Isbn'))
                .append($('<input>').attr('id', 'current-isbn').val(oldIsbn))
                .append($('<button>').text('Save changes').on('click', makeChanges));
        };

        var makeChanges = function makeChanges() {
            var id = $(this).parent().attr('book-id');
            var newBook = {
                'name': $('#current-name').val(),
                'author': $('#current-author').val(),
                'isbn': $('#current-isbn').val()
            };

            scope.requester.editBook(
                id,
                newBook,
                function(){
                    scope.listBooks();
                },
                function(err){
                    console.error(err);
                }
            )
        };

        return {
            getOldData:getOldData
        }
    }

    scope.editBook = editBook();
})(app);


