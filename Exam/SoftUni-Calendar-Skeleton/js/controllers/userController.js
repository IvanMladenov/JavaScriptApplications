var app = app || {};

app.userController = (function(){
    function UserController(view, model){
        this._viewBag = view;
        this._model = model;
    }

    UserController.prototype.showRegister = function showRegister(){
        this._viewBag.showRegister();
    };

    UserController.prototype.showLogin = function showLogin(){
        this._viewBag.showLogin();
    };

    UserController.prototype.registerUser = function registerUser(data){
        this._model.registerUser(data)
            .then(function(success){
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function(){
                    this.trigger('redirectUrl', {url:'#/'})
                })
            });
    };

    UserController.prototype.loginUser = function loginUser(data){
        this._model.loginUser(data)
            .then(function(success){
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function(){
                    this.trigger('redirectUrl', {url:'#/'})
                })
            })
        ;
    };

    UserController.prototype.logoutUser = function logoutUser(){
        this._model.logoutUser()
            .then(function(){
                sessionStorage.clear();
                noty({text:'Logout successfull',
                timeout:2000});
                Sammy(function(){
                    this.trigger('redirectUrl', {url:'#/'})
                })
            });
    };

    return {
        load: function(view, model){
            return new UserController(view, model);
        }
    }
})();