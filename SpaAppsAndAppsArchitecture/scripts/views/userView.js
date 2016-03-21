define(['sammy'], function(Sammy){
    return (function(){
        function UserView(){
            this.selector = $('#wrapper');
        }

        UserView.prototype.showLoginPage = function showLoginPage () {
            var _this = this;
            $.get('templates/loginTemplate.html', function (templ) {
                _this.selector.html(templ);

                $('#login').on('click', function(){
                    var username = $('#username').val(),
                        password = $('#password').val();
                    Sammy(function () {
                        this.trigger('login', {username: username, password: password});
                    });
                });
            });
        };

        return new UserView();
    })();
});
