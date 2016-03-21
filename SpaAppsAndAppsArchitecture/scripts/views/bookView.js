define(['mustache', 'sammy'], function(Mustache, Sammy){
    return (function () {
        function BookView() {
            this.selector = $('#wrapper');
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
                    Sammy(function () {
                        this.trigger('create-book', {name: name, author: author, isbn: isbn});
                    });
                });

                $('.delete').on('click', function () {
                    var id = $(this).parent().attr('book-id');

                    Sammy(function () {
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

                            Sammy(function () {
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

        return new BookView()
    })();
});
