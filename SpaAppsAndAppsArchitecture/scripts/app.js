var app = app || {};

(function () {
    app.router = Sammy(function () {
        var appId = 'kid_bk_D2rnp0l',
            appSecret = 'a855304d3f6047cb92179d8e6b81fe14',
            selector = $('#wrapper'),

            requester = app.requester.config(appId, appSecret),

            bookModel = app.bookModel.load(requester),
            userModel = app.userModel.load(requester),

            bookView = app.bookView.load(selector),
            userView = app.userView.load(selector),

            bookController = app.bookController.load(bookModel, bookView),
            userController = app.userController.load(userModel, userView);

        //this.before({
        //    except: {path: '#\/(register|login)?'}, function() {
        //        if (!sessionStorage.username) {
        //            this.redirect('#/login')
        //        }
        //    });

        this.before({except: {path: '#login'}}, function () {
            if (!sessionStorage.username) {
                this.redirect('#login');
            }
        });

        this.get('#/login', function () {
            userController.showLogin();
        });

        this.get('#/books', function () {
            bookController.showBooks();
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url)
        });

        this.bind('login', function (e, data) {
            userController.login(data);
        });

        this.bind('edit-book', function(e, data){
            bookController.editBook(data);
        });

        this.bind('create-book', function (e, data) {
            bookController.createBook(data);
        });

        this.bind('delete-book', function (e, data) {
            bookController.deleteBook(data);
        })
    });

    app.router.run('#/login');
})();
