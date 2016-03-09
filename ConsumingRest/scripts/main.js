var login = function login() {
    var username = $('#username').val();
    var password = $('#password').val();

    var objForSend = {
        "username": username,
        "password": password
    };

    $.ajax({
        type: "POST",
        url: "https://baas.kinvey.com/user/kid_bk_D2rnp0l/login",
        data: objForSend,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic a2lkX2JrX0Qycm5wMGw6YTg1NTMwNGQzZjYwNDdjYjkyMTc5ZDhlNmI4MWZlMTQ=");
        },
        success: function (data) {
            sessionStorage.authToken = data._kmd.authtoken;
            listBooks();
        },
        error: function (error) {
            console.error(error);
            alert('Invalid username or password');
        }
    })
};

var deleteBook = function deleteBook() {
    var id = $(this).parent().attr('book-id');
    requester.deleteBook(
        id,
        function () {
            listBooks()
        },
        function () {
        }
    );
};

var getOldData = function getOldData(){
    var id = $(this).parent().attr('book-id');
    requester.getBookById(
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

    requester.editBook(
        id,
        newBook,
        function(){
            listBooks();
        },
        function(err){
            console.error(err);
        }
    )
};

var listBooks = function () {
    requester.listAll(
        function (data) {
            $('#books-container').empty();
            for (var index in data) {
                var currentBook = $('<div>').addClass('book').attr('book-id', data[index]._id)
                    .append($('<div>').text('Title: ' + data[index].name))
                    .append($('<div>').text('Author: ' + data[index].author))
                    .append($('<div>').text('ISBN: ' + data[index].isbn))
                    .append($('<button>').text('Delete').on('click', deleteBook))
                    .append($('<button>').text('Edit').addClass('edit').on('click', getOldData));
                $('#books-container').append(currentBook)
            }
        },
        function (err) {
        }
    );
};

var makeBook = function () {
    var book = {
        'name': $('#name').val(),
        'author': $('#author').val(),
        'isbn': $('#isbn').val()
    };

    requester.createBook(book, function () {
        listBooks()
    }, function () {
    });
}

$('#login').on('click', login);
$('#create-book').on('click', makeBook)