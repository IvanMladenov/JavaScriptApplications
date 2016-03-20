var app = app || {};

app.userViews = (function(){
    function UserViews (selector){
        this._selector = selector;
    }

    UserViews.prototype.showRegister = function showRegister(){
        var _this = this;
        $.get('templates/register.html', function(templ){
            _this._selector.html(templ);

            $('#register-button').on('click', function(){
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();
                if (password === confirmPassword){

                    Sammy(function(){
                        this.trigger('register', {
                            username: username,
                            password: password
                        })
                    })
                }else {
                    noty({text: 'password and confirm password are not same', timeout:2000})
                }
            })
        });
    };

    UserViews.prototype.showLogin = function showLogin(){
        var _this = this;
        $.get('templates/login.html', function(templ){
            _this._selector.html(templ);

            $('#login-button').on('click', function(){
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function(){
                    this.trigger('login', {username:username, password: password})
                })
            })
        })
    };

    return {
        load: function(selector){
            return new UserViews(selector);
        }
    }
})();