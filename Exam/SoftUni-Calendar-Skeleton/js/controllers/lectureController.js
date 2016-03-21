var app = app || {};

app.lectureController = (function (){
    function LectureController(view, model){
        this._view = view;
        this._model = model;
    }

    LectureController.prototype.showAllLectures = function showAllLectures(){
        var _this = this;
        this._model.getAllLectures()
            .then(function(success){
                _this._view.showLectures(success)
            })
    };

    LectureController.prototype.showUserLectures = function showUserLectures(){
        var _this = this;
        var id = sessionStorage.userId;
        this._model.getUserLectures(id)
            .then(function(success){
                _this._view.showLectures(success)
            })
    };

    LectureController.prototype.showAddLecture = function addLecture(){
        this._view.showAddLecture();
    };

    LectureController.prototype.showLectureForDelete = function showLectureForDelete(id){
        var _this = this;
        this._model.getLectureById(id)
            .then(function(success){
                _this._view.showLectureForDelete(success);
            });
    };

    LectureController.prototype.editLecture = function editLecture(lecture){
        var _this = this;

        this._model.editLecture(lecture)
            .then(function(){
                noty({text:'successfully edit lecture', timeout:2000});
                Sammy(function(){
                    this.trigger('redirectUrl', {url:'#/calendar/my/'})
                })
            });
    };

    LectureController.prototype.showEditLecture = function showEditLecture(id){
        var _this = this;
        this._model.getLectureById(id)
            .then(function(success){
                _this._view.showLectureForEdit(success);
            });
    };

    LectureController.prototype.deleteLecture = function deleteLecture(id){
        this._model.deleteLecture(id)
            .then(function(){
                noty({text: 'Successfully delete lecture', timeout: 2000});
                Sammy(function(){
                    this.trigger('redirectUrl', {url:'#/calendar/my/'})
                })
            });
    };

    LectureController.prototype.addLecture = function addLecture(data){
        this._model.addLecture(data)
            .then(function(){
                noty({text:'Successfully added lecture.'});
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                })
            });
    };


    return {
        load: function(view, model){
            return new LectureController(view, model)
        }

    }
})();