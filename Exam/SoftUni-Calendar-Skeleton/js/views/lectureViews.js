var app = app || {};

app.lectureViews = (function(){
    function LectureViews(selector){
        this._selector = selector;
    }

    LectureViews.prototype.showLectureForDelete = function (lecture){
        var _this = this;

        $.get('templates/menu-home.html', function(templ){
            $('#menu').html(templ);
        });

        $.get('templates/delete-lecture.html', function(templ){
            var rendered = Mustache.render(templ, lecture);
            _this._selector.html(rendered);

            $('#deleteLecture').on('click', function(){
                Sammy(function(){
                    this.trigger('deleteLecture', {id: lecture._id})
                })
            })
        })
    };

    LectureViews.prototype.showLectureForEdit = function showLectureForEdit(lecture){
        var _this = this;

        $.get('templates/menu-home.html', function(templ){
            $('#menu').html(templ);
        });

        $.get('templates/edit-lecture.html', function(templ){
            var rendered = Mustache.render(templ, lecture);
            _this._selector.html(rendered);

            $('#editLecture').on('click', function(){
                lecture.title = $('#title').val();
                lecture.start = $('#start').val();
                lecture.end = $('#end').val();

                Sammy(function(){
                    this.trigger('editLecture', lecture)
                })
            })
        })
    };

    LectureViews.prototype.showLectures = function showLectures(data){
        var _this = this;

        $.get('templates/menu-home.html', function(templ){
            $('#menu').html(templ);
        });

        $.get('templates/calendar.html', function(templ){
            _this._selector.html(templ);

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            location.href = '#/calendar/add/';
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function() {
                            Sammy(function(){
                                this.trigger('redirectUrl', {url: '#/calendar/edit/'  + calEvent._id})
                            })
                        });
                        $('#deleteLecture').on('click', function() {
                            Sammy(function(){
                                this.trigger('redirectUrl', {url: '#/calendar/delete/' + calEvent._id})
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });

        })
    };

    LectureViews.prototype.showAddLecture = function showAddLecture(){
        var _this = this;
        $.get('templates/add-lecture.html', function(templ){
            _this._selector.html(templ);

            $('#addLecture').on('click', function(){
                var eventInfo = {
                    title: $('#title').val(),
                    start: $('#start').val(),
                    end: $('#end').val(),
                    lecturer: sessionStorage.username
                };

                Sammy(function(){
                    this.trigger('addLecture', eventInfo);
                })
            })
        })
    };

    return {
        load: function(selector){
            return new LectureViews(selector);
        }
    }
})();