(function () {
    require.config({
        paths: {
            jquery: '../libs/jquery',
            mustache: '../libs/mustache',
            q: '../libs/q',
            sammy: '../libs/sammy-latest.min',
            bookController: 'controllers/bookController',
            userController: 'controllers/userController',
            requester: 'helpers/requester',
            bookModel: 'models/bookModel',
            userModel: 'models/userModel',
            bookView: 'views/bookView',
            userView: 'views/userView'
        }
    })
})();

require(['bookController', 'userController', 'sammy'],
    function (bookController, userController, Sammy) {

        var router = Sammy(function () {
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

            this.bind('edit-book', function (e, data) {
                bookController.editBook(data);
            });

            this.bind('create-book', function (e, data) {
                bookController.createBook(data);
            });

            this.bind('delete-book', function (e, data) {
                bookController.deleteBook(data);
            })
        });

        router.run('#/login');
    });

