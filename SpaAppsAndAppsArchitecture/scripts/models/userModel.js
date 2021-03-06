define(['requester'], function(requester){
    return (function(){
        function UserModel(requester){
            this._requester = requester;
            this._serviceUrl = this._requester.baseUrl + 'user/' + this._requester.appId;
        }

        UserModel.prototype.login = function(data){
            var requestUrl = this._serviceUrl + '/login';
            return this._requester.post(requestUrl, data, false);
        };

        return new UserModel(requester)
    })();
});
