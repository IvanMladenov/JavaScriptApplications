var app = app || {};

app.userModel = (function(){
    function UserModel (requester){
        this._requester = requester;
    }

    UserModel.prototype.registerUser = function registerUser(data){
        var requestUrl = this._requester.baseUrl + 'user/' + this._requester.appId + '/';
        return this._requester.post(requestUrl, data, false);
    };

    UserModel.prototype.loginUser = function loginUser(data){
        var requestUrl = this._requester.baseUrl + 'user/' + this._requester.appId + '/' + 'login';
        return this._requester.post(requestUrl, data, false);
    };

    UserModel.prototype.logoutUser = function logoutUser(){
        var requestUrl = this._requester.baseUrl + 'user/' + this._requester.appId + '/' + '_logout';
        return this._requester.post(requestUrl,null, true);
    };

    return {
        load: function(requester){
            return new UserModel(requester);
        }
    }
})();