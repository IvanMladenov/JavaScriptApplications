var app = app || {};

app.lectureModel = (function(){
    function LectureModel(requester){
        this._requester = requester;
    }

    LectureModel.prototype.editLecture = function editLecture(lectrue){
        var requestUrl = this._requester.baseUrl + 'appdata/' + this._requester.appId + '/Lectures/' + lectrue._id;
        return this._requester.put(requestUrl, lectrue, true);
    };

    LectureModel.prototype.getAllLectures = function getAllLectures(){
        var requestUrl = this._requester.baseUrl + 'appdata/' + this._requester.appId + '/Lectures';
        return this._requester.get(requestUrl, true);
    };

    LectureModel.prototype.deleteLecture = function deleteLecture(id){
        var requestUrl = this._requester.baseUrl + 'appdata/' + this._requester.appId + '/Lectures/' + id;
        return this._requester.delete(requestUrl, true);
    };

    LectureModel.prototype.getLectureById = function getLectureById(id){
        var requestUrl = this._requester.baseUrl + 'appdata/' + this._requester.appId + '/Lectures/' + id;
        return this._requester.get(requestUrl, true);
    };

    LectureModel.prototype.addLecture = function addLecture(data){
        var requestUrl = this._requester.baseUrl + 'appdata/' + this._requester.appId + '/Lectures';
        return this._requester.post(requestUrl, data, true);
    };

    LectureModel.prototype.getUserLectures = function getUserLectures(id){
        var requestUrl = this._requester.baseUrl + 'appdata/' + this._requester.appId + '/Lectures/' + '?query={"_acl.creator":"'+ id + '"}';
        return this._requester.get(requestUrl, true);
    };

    return {
        load: function(requester){
            return new LectureModel(requester);
        }
    }
})();