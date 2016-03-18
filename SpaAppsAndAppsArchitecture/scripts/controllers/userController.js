var app = app || {};

app.userController = (function(){
    function UserController (model, view){
        this._model = model;
        this._view = view;
    }

    UserController.prototype.login = function login(data){
        this._model.login(data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                sessionStorage['username'] = success.username;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: '#/books'});
                })
            }).done();
    };

    UserController.prototype.showLogin = function showLogin(){
        this._view.showLoginPage();
    };

    return {
        load: function(model, view){
            return new UserController(model, view);
        }
    }
})();
