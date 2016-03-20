var app = app || {};

app.bookView = (function () {
    function BookView(selector) {
        this.selector = selector;
    }

    BookView.prototype.listAllBooks = function listAllBooks(booksCollection) {
        var _this = this;
        $.get('templates/booksViewTemplate.html', function (templ) {
            var json = {
                books: booksCollection
            };
            var rendered = Mustache.render(templ, json);
            _this.selector.empty().html(rendered);

            $('#create-book').on('click', function () {
                var name = $('#name').val(),
                    author = $('#author').val(),
                    isbn = $('#isbn').val();
                $.sammy(function () {
                    this.trigger('create-book', {name: name, author: author, isbn: isbn});
                });
            });

            $('.delete').on('click', function () {
                var id = $(this).parent().attr('book-id');

                $.sammy(function () {
                    this.trigger('delete-book', {id: id});
                });
            });

            $('.edit').on('click', function () {
                var parent = $(this).parent();
                $.get('templates/editFieldHtml.html', function (templ) {
                    parent.empty().html(templ);

                    $('#save-changes').on('click', function () {
                        var newName = $('#current-name').val(),
                            newAuthor = $('#current-author').val(),
                            newIsbn = $('#current-isbn').val(),
                            bookId = $(this).parent().attr('book-id');

                        $.sammy(function () {
                            this.trigger('edit-book',
                                {
                                    name: newName,
                                    author: newAuthor,
                                    isbn: newIsbn,
                                    bookId: bookId
                                }
                            )
                        })
                    })
                });
            });

        });
    };

    return {
        load: function (selector) {
            return new BookView(selector);
        }
    }
})();
