define(['userModel', 'userView', 'sammy'], function(model, view, Sammy){
    return (function(){
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
                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/books'});
                    })
                }).done();
        };

        UserController.prototype.showLogin = function showLogin(){
            this._view.showLoginPage();
        };

        return new UserController(model, view);
    })();
});
