var app = app || {};

app.homeViews = (function(){
    function HomeViews(selector){
        this._selector = selector;
    }

    HomeViews.prototype.showWelcomeForUnloged = function showWelcomeForUnloged(){
        var _this = this;
        $.get('templates/welcome-guest.html', function(templ){
            _this._selector.html(templ);
        });

        $.get('templates/menu-login.html', function(templ){
            $('#menu').html(templ);
        })
    };

    HomeViews.prototype.showWelcomeForLogged = function showWelcomeForLogged(){
        var _this = this;
        $.get('templates/welcome-user.html', function(templ){
            var json = {
                username: sessionStorage.username
            };

            var rendered = Mustache.render(templ, json);

            _this._selector.html(rendered);

            $.get('templates/menu-home.html', function(templ){
                $('#menu').html(templ);
            })
        })
    };

    return {
        load: function  (selector){
            return new HomeViews(selector);
        }
    }
})();