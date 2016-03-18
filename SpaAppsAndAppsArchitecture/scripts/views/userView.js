var app = app || {};

app.userView = (function(){
    function UserView(selector){
        this.selector = selector;
    }

    UserView.prototype.showLoginPage = function showLoginPage () {
        var _this = this;
        $.get('templates/loginTemplate.html', function (templ) {
            _this.selector.html(templ);

            $('#login').on('click', function(){
                var username = $('#username').val(),
                    password = $('#password').val();

                $.sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });
            });
        });
    };

    return {
        load: function(selector){
            return new UserView(selector);
        }
    }
})();
