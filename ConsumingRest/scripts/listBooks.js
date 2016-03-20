var app = app||{};

(function(scope){
     function listBooks () {
        scope.requester.listAll(
            function (data) {
                $('#books-container').empty();
                for (var index in data) {
                    var editButton = scope.eventListenerFactory('edit'),
                        deleteButton = scope.eventListenerFactory('delete'),
                        currentBook = $('<div>').addClass('book').attr('book-id', data[index]._id)
                            .append($('<div>').text('Title: ' + data[index].name))
                            .append($('<div>').text('Author: ' + data[index].author))
                            .append($('<div>').text('ISBN: ' + data[index].isbn))
                            .append(deleteButton)
                            .append(editButton);
                    $('#books-container').append(currentBook)
                }
            },
            function (err) {
                console.error(err);
            }
        );
    }

    scope.listBooks = listBooks;
})(app);

