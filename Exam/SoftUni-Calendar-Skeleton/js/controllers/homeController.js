var app = app || {};

app.homeController = (function(){
    function HomeController(view){
        this._view = view;
    }

    HomeController.prototype.showWelcomeForUnloged = function showWelcomeForUnloged(){
        this._view.showWelcomeForUnloged();
    };

    HomeController.prototype.showWelcomeForLogged = function showWelcomeForLogged(){
        this._view.showWelcomeForLogged();
    };

        return {
        load: function  (view){
            return new HomeController(view);
        }
    }
})();